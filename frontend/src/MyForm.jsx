import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const MyForm = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [sector, setsector] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [sectorslist, setsectorslist] = useState([]);
  const { id } = useParams();

  async function fetchsectors() {
    const response = await fetch("http://localhost:8080/list/sector");
    const data = await response.json();
    console.log(data.sectors[0].sectors);
    setsectorslist(data.sectors[0].sectors);
  }

  async function AddSector(e) {
    e.preventDefault();
    let Postdata = {
      name: username,
      sector: sector,
      agreedTerms: checkbox,
    };
    const response = await fetch("http://localhost:8080/sector/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Postdata),
    });
    const data = await response.json();
    console.log(data);
    navigate("/");
  }
  useEffect(() => {
    fetchsectors();
  }, []);

  async function getSector() {
    const response = await fetch(`http://localhost:8080/sector/get/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setusername(data.list.name);
    setsector(data.list.sector);
    setcheckbox(data.list.agreedTerms);
  }
  useEffect(() => {
    if (id) {
      getSector();
    }
  }, [id]);

  async function EditSector(e) {
    e.preventDefault();
    let Postdata = {
      name: username,
      sector: sector,
      agreedTerms: true,
    };
    const response = await fetch(`http://localhost:8080/sector/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Postdata),
    });
    const data = await response.json();
    console.log(data);
    console.log(Postdata);
    navigate("/");
  }

  return (
    <>
      <div className="container-form">
        <div className="Form-title">
          <h1>Add Sector Details</h1>
        </div>
        <form
          onSubmit={(e) => {
            if (id) {
              EditSector(e);
            } else {
              AddSector(e);
            }
          }}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              placeholder="username"
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="selectOption">Select a sector:</label>
            <select
              required
              id="selectOption"
              onChange={(e) => setsector(e.target.value)}
              name="selectedOption"
              value={sector}
            >
              <option className="mb-3" value="">
                -- Please select --
              </option>
              {Object.entries(sectorslist).map(([category, items]) => (
                <>
                  <option
                    style={{ fontWeight: "600" }}
                    key={category}
                    value={category}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;{category}
                  </option>
                  {items.map((item) => (
                    <option key={item} value={item}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item}
                    </option>
                  ))}
                </>
              ))}
            </select>
          </div>
          <div class="mb-3 form-check">
            <input
              value={checkbox}
              onChange={(e) => setcheckbox(!checkbox)}
              required
              checked={checkbox}
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Agree to terms
            </label>
          </div>
          <div className="form-btn-container">
            <button type="submit">Submit</button>
            <Link className="edit-btn" to="/">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyForm;
