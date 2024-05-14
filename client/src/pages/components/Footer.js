import React from "react";

const styles = {
  div: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    width: "100%",
    heigth: "10px",
  },
};

function Footer() {
  return (
    <div style={styles.footer}>
      <p>
        Email: <a href="mailto:chrimarc71@gmail.com">chrimarc71@gmail.com</a>,{" "}
        <a href="mailto:christian.marconetto@jcmaxwell.it">
          christian.marconetto@jcmaxwell.it
        </a>
      </p>
      <p>Telefono: +39 0123456789</p>
    </div>
  );
}

export default Footer;
