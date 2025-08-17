
const index = ({text, title, images}) => {
    return (
        <div className=" flex flex-col w-full text-start  px-4 ">
        <div className="  flex items-center justify-center  mr-[20%] " >
        <img src={images} className=" w-[26px] h-auto" alt="flashLogo" />
        </div>
        <h4 className=" text-xl mb-5 ">
          {title}
        </h4>
        <p>
          {text}
        </p>
        </div>
    )
  }
  
  
  export default index