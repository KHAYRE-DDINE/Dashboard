import React, { useContext, useState } from "react";
import { idPersonContext, setIdPersonContext } from "../LoginRegister";


function Signer() {
  const [person, setPerson] = useState(["learner", "teacher", "parent"]);
  const [personAr, setPersonAr] = useState(["متعلم", "معلم", "ولي أمر"]);
  const idContext = useContext(idPersonContext);
  const setIdContext = useContext(setIdPersonContext);

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

export default Signer;
