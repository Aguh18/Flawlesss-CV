"""
Enhanced PDF text extraction utility
Combines multiple extraction methods for better text quality
"""

import re
import logging
from typing import Optional, Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFExtractor:
    """Enhanced PDF text extractor with multiple extraction methods"""
    
    def __init__(self):
        self.available_extractors = self._check_available_extractors()
        logger.info(f"Available extractors: {list(self.available_extractors.keys())}")
    
    def _check_available_extractors(self) -> Dict[str, bool]:
        """Check which PDF extraction libraries are available"""
        extractors = {}
        
        # Check PyMuPDF (fitz) - Best quality
        try:
            import fitz
            extractors['pymupdf'] = True
            logger.info("✅ PyMuPDF (fitz) available - Best quality")
        except ImportError:
            extractors['pymupdf'] = False
            logger.warning("❌ PyMuPDF not available")
        
        # Check pdfplumber - Good for tables
        try:
            import pdfplumber
            extractors['pdfplumber'] = True
            logger.info("✅ pdfplumber available - Good for tables")
        except ImportError:
            extractors['pdfplumber'] = False
            logger.warning("❌ pdfplumber not available")
        
        # Check PyPDF - Basic fallback
        try:
            from pypdf import PdfReader
            extractors['pypdf'] = True
            logger.info("✅ PyPDF available - Basic fallback")
        except ImportError:
            extractors['pypdf'] = False
            logger.warning("❌ PyPDF not available")
        
        return extractors
    
    def extract_with_pymupdf(self, file_obj) -> Optional[str]:
        """Extract text using PyMuPDF (best quality)"""
        try:
            import fitz
            
            # Reset file pointer
            file_obj.seek(0)
            pdf_data = file_obj.read()
            
            # Open PDF from bytes
            pdf_document = fitz.open(stream=pdf_data, filetype="pdf")
            
            text_parts = []
            for page_num in range(pdf_document.page_count):
                page = pdf_document[page_num]
                
                # Extract text with better formatting
                text = page.get_text()
                
                # Clean up the text
                text = self._clean_text(text)
                
                if text.strip():
                    text_parts.append(f"=== Page {page_num + 1} ===\n{text}")
            
            pdf_document.close()
            
            final_text = "\n\n".join(text_parts)
            logger.info(f"PyMuPDF extracted {len(final_text)} characters from {len(text_parts)} pages")
            return final_text
            
        except Exception as e:
            logger.error(f"PyMuPDF extraction failed: {e}")
            return None
    
    def extract_with_pdfplumber(self, file_obj) -> Optional[str]:
        """Extract text using pdfplumber (good for structured content)"""
        try:
            import pdfplumber
            
            # Reset file pointer
            file_obj.seek(0)
            
            text_parts = []
            with pdfplumber.open(file_obj) as pdf:
                for page_num, page in enumerate(pdf.pages):
                    # Extract text
                    text = page.extract_text()
                    
                    if text:
                        # Clean up the text
                        text = self._clean_text(text)
                        
                        # Try to extract tables separately
                        tables = page.extract_tables()
                        if tables:
                            text += "\n\n[TABLES DETECTED]\n"
                            for i, table in enumerate(tables):
                                if table:
                                    text += f"Table {i+1}:\n"
                                    for row in table:
                                        if row:
                                            clean_row = [str(cell) if cell else "" for cell in row]
                                            text += " | ".join(clean_row) + "\n"
                                    text += "\n"
                        
                        if text.strip():
                            text_parts.append(f"=== Page {page_num + 1} ===\n{text}")
            
            final_text = "\n\n".join(text_parts)
            logger.info(f"pdfplumber extracted {len(final_text)} characters from {len(text_parts)} pages")
            return final_text
            
        except Exception as e:
            logger.error(f"pdfplumber extraction failed: {e}")
            return None
    
    def extract_with_pypdf(self, file_obj) -> Optional[str]:
        """Extract text using PyPDF (basic fallback)"""
        try:
            from pypdf import PdfReader
            
            # Reset file pointer
            file_obj.seek(0)
            
            reader = PdfReader(file_obj)
            text_parts = []
            
            for page_num, page in enumerate(reader.pages):
                text = page.extract_text()
                
                if text:
                    # Clean up the text
                    text = self._clean_text(text)
                    
                    if text.strip():
                        text_parts.append(f"=== Page {page_num + 1} ===\n{text}")
            
            final_text = "\n\n".join(text_parts)
            logger.info(f"PyPDF extracted {len(final_text)} characters from {len(text_parts)} pages")
            return final_text
            
        except Exception as e:
            logger.error(f"PyPDF extraction failed: {e}")
            return None
    
    def _clean_text(self, text: str) -> str:
        """Clean and normalize extracted text"""
        if not text:
            return ""
        
        # Remove null bytes and other problematic characters
        text = text.replace('\x00', ' ')
        text = text.replace('\ufeff', '')  # BOM
        text = text.replace('\u200b', '')  # Zero-width space
        
        # Fix common spacing issues
        text = re.sub(r'\s+', ' ', text)  # Multiple spaces to single
        text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)  # Multiple newlines to double
        
        # Fix missing spaces after punctuation
        text = re.sub(r'([.!?])([A-Z])', r'\1 \2', text)
        
        # Fix missing spaces between words and numbers
        text = re.sub(r'([a-zA-Z])(\d)', r'\1 \2', text)
        text = re.sub(r'(\d)([a-zA-Z])', r'\1 \2', text)
        
        # Clean up bullet points
        text = re.sub(r'[•·▪▫]', '•', text)
        
        return text.strip()
    
    def extract_text(self, file_obj) -> str:
        """
        Extract text using the best available method
        Falls back to other methods if the preferred one fails
        """
        extraction_methods = []
        
        # Prioritize methods by quality
        if self.available_extractors.get('pymupdf', False):
            extraction_methods.append(('PyMuPDF', self.extract_with_pymupdf))
        
        if self.available_extractors.get('pdfplumber', False):
            extraction_methods.append(('pdfplumber', self.extract_with_pdfplumber))
        
        if self.available_extractors.get('pypdf', False):
            extraction_methods.append(('PyPDF', self.extract_with_pypdf))
        
        if not extraction_methods:
            raise RuntimeError("No PDF extraction libraries available. Please install pypdf, pdfplumber, or pymupdf.")
        
        # Try each method in order
        for method_name, method_func in extraction_methods:
            logger.info(f"Trying extraction with {method_name}...")
            try:
                result = method_func(file_obj)
                if result and len(result.strip()) > 50:  # Minimum viable text length
                    logger.info(f"✅ Successfully extracted text using {method_name}")
                    return result
                else:
                    logger.warning(f"⚠️ {method_name} extracted insufficient text, trying next method...")
            except Exception as e:
                logger.error(f"❌ {method_name} failed: {e}")
                continue
        
        # If all methods fail, return error message
        logger.error("All extraction methods failed")
        raise RuntimeError("Failed to extract text from PDF using all available methods")
    
    def get_extraction_info(self) -> Dict[str, Any]:
        """Get information about available extraction methods"""
        return {
            "available_extractors": self.available_extractors,
            "recommended_method": "PyMuPDF" if self.available_extractors.get('pymupdf', False) else "pdfplumber" if self.available_extractors.get('pdfplumber', False) else "PyPDF",
            "quality_ranking": ["PyMuPDF", "pdfplumber", "PyPDF"]
        }


# Convenience function for easy usage
def extract_pdf_text(file_obj) -> str:
    """
    Quick function to extract text from PDF file object
    """
    extractor = PDFExtractor()
    return extractor.extract_text(file_obj)


# Test function
def test_extraction_quality(file_path: str):
    """Test and compare extraction quality"""
    extractor = PDFExtractor()
    
    print("=== PDF EXTRACTION QUALITY TEST ===\n")
    print(f"Testing file: {file_path}")
    print(f"Available extractors: {extractor.available_extractors}\n")
    
    try:
        with open(file_path, 'rb') as f:
            text = extractor.extract_text(f)
            print(f"Final extracted text length: {len(text)} characters")
            print("\nFirst 500 characters:")
            print("-" * 50)
            print(text[:500])
            print("-" * 50)
            
            # Quality analysis
            lines = text.split('\n')
            words = text.split()
            
            print(f"\nQuality Analysis:")
            print(f"  Total lines: {len(lines)}")
            print(f"  Total words: {len(words)}")
            print(f"  Average words per line: {len(words) / len(lines):.1f}")
            print(f"  Contains tables: {'[TABLES DETECTED]' in text}")
            print(f"  Contains page markers: {'=== Page' in text}")
            
    except Exception as e:
        print(f"Test failed: {e}")


if __name__ == "__main__":
    # Test with sample PDF if available
    import os
    test_file = "../flawlessCv/src/assets/pdf/teguh.pdf"
    if os.path.exists(test_file):
        test_extraction_quality(test_file)
    else:
        print("Test file not found. Showing extractor info only.")
        extractor = PDFExtractor()
        print(extractor.get_extraction_info())
