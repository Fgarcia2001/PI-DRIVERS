import React from "react";
import style from "./About.module.css";
const image =
  "https://scontent.fros9-1.fna.fbcdn.net/v/t1.6435-9/91067792_2796571193753095_2919034145738850304_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=be3454&_nc_ohc=F4zGHT0kwbMAX9U8fwJ&_nc_ht=scontent.fros9-1.fna&oh=00_AfAWvFmFPjualZ03a5cOpVczPscCkoCfX2d3eTV0T5W7mA&oe=6560E3F8";
const About = () => {
  return (
    <div className={style.container}>
      <div>
        <img src={image} className={style.img} />
      </div>
      <div className={style.contTitles}>
        <h2 className={style.titles}>ID | 0</h2>
        <h2 className={style.titles}>Name| Franco</h2>
        <h2 className={style.titles}>Lastname| Garcia</h2>
        <h2 className={style.titles}>Nationality| Argentinian</h2>
        <h2 className={style.titles}>Birthdate| 2001- 07 -10</h2>
        <h2 className={style.titles}>
          Description: I'm student from "Soy Henry" and I am in the PI stage{" "}
        </h2>
        <h2 className={style.titles}>Teams: Soy Henry</h2>
      </div>
    </div>
  );
};

export default About;
