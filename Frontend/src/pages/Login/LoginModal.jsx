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

import Modal from 'react-modal';
import { LoginFields } from "./LoginFields";

Modal.setAppElement('#root');

function LoginModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Login</button>
      <Modal dialogClassName="myModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>Login</h2>
        <form>
          <LoginFields />
          <button className="SubmitBtn" type="submit">Login</button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default LoginModal;