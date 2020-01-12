import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import PicAndComments from '../PicAndComments';
import './Modal.css';

const Modal = ({ onClose, id }) => {
  const modal = useRef(null);

  const handleKeyUp = useCallback(
    e => {
      const keys = {
        27: () => {
          e.preventDefault();
          onClose();
          window.removeEventListener('keyup', handleKeyUp, false);
        },
      };

      if (keys[e.keyCode]) {
        keys[e.keyCode]();
      }
    },
    [onClose],
  );

  const handleOutsideClick = useCallback(
    e => {
      if (modal !== null && modal !== undefined) {
        if (!modal.current.contains(e.target)) {
          onClose();
          document.removeEventListener('click', handleOutsideClick, false);
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleKeyUp, handleOutsideClick]);
  return (
    <div className="modal">
      <PicAndComments imageId={id} onClose={onClose} forwardedRef={modal} />
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Modal;
