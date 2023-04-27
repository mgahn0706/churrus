import {ClueButton} from "@/components/ClueButton";
import Image from "next/image";

export default function Startup(){

    return (<>
            <Image
            src='/lounge.png'
            alt='스타트업 라운지 이미지'
            fill
            style={{
                display: 'inline-block',
                objectFit: "cover",
                objectPosition: 'center',
                zIndex: -1,
                position: 'relative',
            }}
            onClick={()=>{

                // document.onclick=(e)=>{console.log(e.pageX, e.pageY);}

            }}
        />
            <ClueButton label={'시체'} index={1} onClick={()=>{}}
            x={950} y={480}
            />
            <ClueButton label={'한채원의 술잔'} index={2} onClick={()=>{}} x={927} y={443}/>
        </>
    )
}

