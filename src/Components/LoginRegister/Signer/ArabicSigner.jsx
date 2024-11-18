import React from "react";

function ArabicSigner({ personAr, setIdContext, idContext }) {
  return (
    <React.Fragment>
      <p> : مرحبا بكم في أكاديمية الرحلة، انضم إلينا</p>
      <div className="signer flex flex-row-reverse">
        {personAr.map((e, idx) => (
          <button
            key={idx}
            onClick={() => setIdContext(idx)}
            className={idx === idContext ? "btn clicked" : "btn"}
          >
            {e}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ArabicSigner;
