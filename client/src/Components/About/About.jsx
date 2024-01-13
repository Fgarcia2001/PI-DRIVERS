import React from "react";
import style from "./About.module.css";
import mifoto from "../../images/mifoto.jpg";
const About = () => {
  return (
    <div className={style.container}>
      <div>
        <img src={mifoto} className={style.img} />
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
