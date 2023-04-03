import React, { useState } from 'react';
import './App.css';

function App() {
  const [grades, setGrades] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
  });
  const [credits, setCredits] = useState({
    cred1: '',
    cred2: '',
    cred3: '',
    cred4: '',
    cred5: '',
  });
  const [sgpa, setSgpa] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChangeSub = (e) => {
    const { name, value } = e.target;
    setGrades({ ...grades, [name]: value });
  };
  const handleOnChangeCred = (e) => {
    const { name, value } = e.target;
    setCredits({ ...credits, [name]: value });
  };

  const calculateSgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let validGrades = true;
    for (const subject in grades) {
      if (grades[subject] === '') {
        setErrorMsg('Please enter all grades.');
        validGrades = false;
        break;
      } else if (grades[subject] < 0 || grades[subject] > 10) {
        setErrorMsg('Please enter valid grades (between 0 and 10).');
        validGrades = false;
        break;
      } else {
        for (const creds in credits) {
          if (creds.slice(-1) === subject.slice(-1)) {
            console.log("Creds: " + creds);
            console.log(subject);
            totalCredits += parseInt(credits[creds]);
            totalPoints += grades[subject] * credits[creds];
          }
        }

      }
    }
    if (validGrades) {
      setSgpa((totalPoints / totalCredits).toFixed(2));
      setErrorMsg('');
    } else {
      setSgpa('');
    }
  };

  const handleReset = () => {
    setGrades({
      subject1: '',
      subject2: '',
      subject3: '',
      subject4: '',
      subject5: '',
    });
    setCredits({
      cred1: '',
      cred2: '',
      cred3: '',
      cred4: '',
      cred5: '',
    });
    setSgpa('');
    setErrorMsg('');
  };

  return (
    <body>
      <div className="App">
        <div className="overlay">
          <div className="Box">
            <h1>Calculate SGPA</h1>
            <form>
              <table>
                <thead>
                  <td>Subject</td>
                  <td>Grade</td>
                  <td>Credit</td>
                </thead>
                <tbody>
                  <tr>
                    <td><label>Subject 1:</label></td>
                    <td><input type="number" name="subject1" value={grades.subject1} onChange={handleOnChangeSub} /></td>
                    <td><input type="number" name="cred1" value={credits.cred1} onChange={handleOnChangeCred} /></td>
                  </tr>
                  <tr>
                    <td><label>Subject 2:</label></td>
                    <td><input type="number" name="subject2" value={grades.subject2} onChange={handleOnChangeSub} /></td>
                    <td><input type="number" name="cred2" value={credits.cred2} onChange={handleOnChangeCred} /></td>
                  </tr>
                  <tr>
                    <td><label>Subject 3:</label></td>
                    <td><input type="number" name="subject3" value={grades.subject3} onChange={handleOnChangeSub} /></td>
                    <td><input type="number" name="cred3" value={credits.cred3} onChange={handleOnChangeCred} /></td>
                  </tr>
                  <tr>
                    <td><label>Subject 4:</label></td>
                    <td><input type="number" name="subject4" value={grades.subject4} onChange={handleOnChangeSub} /></td>
                    <td><input type="number" name="cred4" value={credits.cred4} onChange={handleOnChangeCred} /></td>
                  </tr>
                  <tr>
                    <td><label>Subject 5:</label></td>
                    <td><input type="number" name="subject5" value={grades.subject5} onChange={handleOnChangeSub} /></td>
                    <td><input type="number" name="cred5" value={credits.cred5} onChange={handleOnChangeCred} /></td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <button type="button" onClick={calculateSgpa}>
                Calculate SGPA
              </button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </form>
            {sgpa && <p>Your SGPA is: {sgpa}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
