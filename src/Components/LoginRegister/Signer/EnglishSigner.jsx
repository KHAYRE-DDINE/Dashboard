import React from "react";

function EnglishSigner({ person, setIdContext, idContext }) {
  return (
    <React.Fragment>
      <p>Welcome to Al Rihla Academy, join us as a</p>
      <div className="signer">
        {person.map((e, idx) => (
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

export default EnglishSigner;
