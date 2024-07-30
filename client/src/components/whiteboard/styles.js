import reactCSS from "reactcss";

export const styles = reactCSS({
  default: {
    righticons: {
      border: "none",
      width: '60px',
      height: `60px`,
      background: "none",
      borderRadius: "0.1%",
      outline: "none",
      padding: "0.5%",
    },
    topicons: {
      border: "none",
      width: `60px`,
      height: `auto`,
      background: "none",
      borderRadius: "4px",
      outline: "none",
      padding: "0.5%",
    },
    picker: {
      border: "none",
      backgroundImage:
        "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
      width: `45px`,
      height: `45px`,
      borderRadius: "7%",
      outline: "none",
      filter: "blur(0.5px)",
      padding: "0.5rem",
      marginTop:
        window.innerWidth <= 1024 //320
          ? `${window.innerHeight - window.innerHeight * 0.981}px`
          : `${window.innerHeight - window.innerHeight * 0.999}px`,
    },
  },
});
