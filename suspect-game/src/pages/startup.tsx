import {ClueButton} from "@/components/ClueButton";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Startup(){

    return (<>
            <Image
            src='/lounge.png'
            alt='스타트업 라운지 이미지'
            fill
            style={{
                zIndex: -1,     
            }}
            onClick={()=>{
                // document.onclick=(e)=>{console.log(e.pageX, e.pageY);}
            }}
        />
            <ClueButton label={'시체'} index={1} onClick={()=>{}}
            x={30} y={48}
            />
            <ClueButton label={'한채원의 술잔'} index={2} onClick={()=>{}} x={27} y={43}/></>
    )
}

