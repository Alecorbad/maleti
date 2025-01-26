
"use client";
import MediaQuery from '@/app/hooks/useMediaQuery';

import styles from "./wall.module.css"
import React from 'react'

type Mode = ("relative" | "grid" | "flex" | "horizScroll");


interface WallProps{
  children: React.ReactNode,
  paintingsWidth?: string,
  paintingsHeight?: string,
  mode?: Mode,

  width?: string,
  height?: string,
  padding?: string,
  margin?: string,

  contentJustify?: string,
  itemsAlign?: string,
  itemsJustify?: string,
  scrollAlign?: string,
  scrollStop?: string,
  gridTemplateAreas?: string,
  gridColsTemplate?:  string,
  gridRowsTemplate?:  string,  
  gridAutoRows?: string,
  gridAutoCols?: string,
  gridGap?: string,


  gridMobileTemplateAreas?: string,
  gridMobileColsTemplate?:  string,
  gridMobileRowsTemplate?:  string,  
}

const Wall = (props: WallProps) => {
  // const targetRef = useRef<HTMLDivElement | null>(null);
  const isMobile = MediaQuery(768);

  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  //   offset: ["start start", "end end"]
  // })
  // const x = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);

  const dynamicStyles: React.CSSProperties = {
        width: (props.width ?? '100%'),
        height: (props.height ?? 'auto'),
        padding: (props.padding ?? '1rem'),
        margin: (props.margin ?? '4rem 0'),
        scrollSnapAlign: (props.scrollAlign ?? 'none'),
        alignItems: (props.itemsAlign ?? 'center'),
        justifyItems: (props.itemsJustify ?? 'center'),
        justifyContent: (props.contentJustify ?? 'center')
      };

    if(props.mode == "grid"){
      dynamicStyles.display = "grid";
      dynamicStyles.gridTemplateAreas = props.gridTemplateAreas;
      
      dynamicStyles.gridGap = props.gridGap;
      dynamicStyles.gridAutoRows = props.gridAutoRows ?? "1fr";
      dynamicStyles.gridAutoColumns = props.gridAutoCols ?? "1fr";


      if(isMobile && props.gridMobileColsTemplate){
        dynamicStyles.gridTemplateColumns = props.gridMobileColsTemplate;
      }
      else{
        dynamicStyles.gridTemplateColumns = props.gridColsTemplate;
        if(props.gridColsTemplate){
          dynamicStyles.width = "auto"
        }
      }


      if(isMobile && props.gridMobileRowsTemplate){
        dynamicStyles.gridTemplateRows = props.gridMobileRowsTemplate;
      }
      else{
        dynamicStyles.gridTemplateRows = props.gridRowsTemplate;
        if(props.gridRowsTemplate){
          dynamicStyles.height = "auto"
        }
      }

    }

    else if(props.mode == "relative"){
      dynamicStyles.position = "relative";
    }

     else if(props.mode == "flex"){
      dynamicStyles.display = "flex"
      dynamicStyles.flexWrap = "wrap"
    }

    // else if(props.mode == "horizScroll"){
    //   dynamicStyles.display = "flex"

    //   return(
    //     <>
    //     <div ref={targetRef} className={`${styles.wallContainer}`} style={dynamicStyles}>
    //       <div className="sticky top-0 flex items-center overflow-hidden" style={{'height': "50vh"}}>
    //         <motion.div style={{ x }} className="flex gap-4">
    //           {
    //             React.Children.toArray(props.children)
    //           }
    //         </motion.div>
    //       </div>
    //     </div>
    //     </>
    //   )
    // }


  return (
    <>
    <div className={styles.wallContainer} style={dynamicStyles}>
        {
          React.Children.toArray(props.children)
        }
      </div>
    </>
  );
};



export default Wall;

