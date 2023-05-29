export const Hero = () => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <img
        src="https://plus.unsplash.com/premium_photo-1661284864840-7d9539d4b34a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        alt="eye"
        height={500}
        style={{ objectFit: "cover" }}
      />

      <div
        style={{
          width: "65%",
          padding: "0 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(251 252 254)",
        }}
      >
        <div
          style={{
            width: "35%",
            fontFamily: '"Kdam Thmor Pro", sans-serif',
            color: "#7F0858",
          }}
        >
          Welcome to SPARKLESCOOP
        </div>
        <div
          style={{
            fontFamily: '"Kdam Thmor Pro", sans-serif',
            marginTop: "40px",
            color: "#c597a0",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate
          consequatur accusamus voluptatum non error asperiores eaque soluta
          inventore quas! Culpa nesciunt ad repellendus cum neque sapiente nihil
          minus odio?
        </div>
      </div>
    </div>
  );
};
