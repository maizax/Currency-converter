import classes from "./Loading.module.css";

const Loading = () => {
  //1 spinner
  // return <div className={classes.spinner}></div>;}

  //2 spinner
  return (
    <div className={classes.loader}>
      <div className={classes.circle}></div>
      <div className={classes.circle}></div>
    </div>
  );
};

//3 spinner
//   return <div className={classes.loader}>Loading</div>;
// };

//4 spinner
//   return (
//     <div className={classes.loader}>
//       <span></span>
//       <span></span>
//       <span></span>
//     </div>
//   );
// };

export default Loading;
