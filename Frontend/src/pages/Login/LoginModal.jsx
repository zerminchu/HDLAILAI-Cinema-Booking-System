import React, { useState } from "react";
import "./TestCss.css";

// export default function LoginModal() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button
//         className="LoginBtn"
//         onClick={() => setShowModal(true)}
//       >
//         Login
//       </button>
//       {showModal ? (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>
//               &times;
//             </span>
//             <p>Some text in the Modal..</p>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// export default function LoginModal() {
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   if(modal) {
//     document.body.classList.add('active-modal')
//   } else {
//     document.body.classList.remove('active-modal')
//   }

//   return (
//     <>
//       <button onClick={toggleModal} className="btn-modal">
//         Open
//       </button>

//       {modal && (
//         <div className="modal">
//           <div onClick={toggleModal} className="overlay"></div>
//           <div className="modal-content">
//             <h2>Hello Modal</h2>
//             <button className="close-modal" onClick={toggleModal}>
//               CLOSE
//             </button>
//           </div>
//         </div>
//       )}
//       </>
//   );
// }

import Modal from "react-modal";
import { EmailField, PasswordField } from "./LoginFields";
import LoginForm from "./TestForm";

Modal.setAppElement("#root");

/* function LoginModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit() {
    console.log("submitted");
    console.log(email);
    console.log(password);
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Login</button>
      <Modal
        dialogClassName="myModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <EmailField email={email} setEmail={setEmail} />
          <PasswordField password={password} setPassword={setPassword} />
          <button className="SubmitBtn" type="submit">
            Login
          </button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
} */

function CustomModal({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>{Login}</button>
      <Modal
        dialogClassName="myModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {children}
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

function LoginModal() {
  return (
    <CustomModal>
      <LoginForm />
      <h1>hello</h1>
      <p>This is a test</p>
    </CustomModal>
  );
}

export default LoginModal;
