import React from "react";
import "./App.css";
import { BsArrowLeft } from "react-icons/bs/";
import { MdLocationOn } from "react-icons/md/";
import { FaSuitcase } from "react-icons/fa/";
import { BsPersonFill } from "react-icons/bs/";
import { BsPerson } from "react-icons/bs/";
import { AiFillStar } from "react-icons/ai/";
import { BiGitBranch } from "react-icons/bi";
import { BsFileEarmarkCodeFill } from "react-icons/bs";
import { IoMdOpen } from "react-icons/io";
import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import AOS from "aos";

function App() {
  const [user, setUser] = React.useState(null);
  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(null);
  const [component, setComponent] = React.useState(true);
  const [repositories, setRepositories] = React.useState(null);

  function onChangeUser(e) {
    setUser(e.target.value);
  }

  React.useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  async function searchUser() {
    setCarregando(true);

    const repResponse = await fetch(
      `https://api.github.com/users/${user}/repos`
    );
    const repJson = await repResponse.json();

    const response = await fetch(`https://api.github.com/users/${user}`);
    const json = await response.json();

    setRepositories(repJson);
    setDados(json);

    setTimeout(() => {
      setCarregando(false);
      setComponent(false);
    }, 1000);
  }

  return (
    <div className="App">
      {component ? (
        <div className="Home">
          <img
            className="iTop"
            alt="GitHub"
            src="https://raw.githubusercontent.com/Diegooliveyra/Github_Search/3b485a17a2d890d53e63a09428e82ec52d059057/assets/logo-vertical.svg"
          />
          <input
            className="iBtm"
            onChange={onChangeUser}
            placeholder="Enter user name"
            type="text"
          />
          {carregando ? <div className="dot-falling"></div> : ""}

          <button className="iBtm" onClick={searchUser}>
            Search
          </button>
        </div>
      ) : (
        <div className="User">
          <div className="TopSide ">
            <header className="iTop">
              <img src="https://raw.githubusercontent.com/Diegooliveyra/Github_Search/3b485a17a2d890d53e63a09428e82ec52d059057/assets/logo-horizontal.svg" />
              <span className="btnBack" onClick={() => setComponent(true)}>
                <BsArrowLeft />
              </span>
            </header>
            <div className="HeaderPerfil iTop">
              <img className="profile" src={dados.avatar_url} />

              <div className="infosProfile">
                <h1>{dados.name}</h1>
                <p className="arroba">{`@${dados.login}`}</p>
                <p>
                  <span style={{ marginLeft: "0" }}>
                    <MdLocationOn /> {dados.location}
                  </span>

                  <span>
                    <FaSuitcase /> {dados.company}
                  </span>
                  <span>
                    <BsPersonFill /> {dados.followers > 0 ? dados.followers : 0}
                  </span>
                  <span>
                    <BsPerson /> {dados.following > 0 ? dados.following : 0}
                  </span>
                </p>
              </div>

              <div className="Repos">
                <div>
                  <p>Total Repositories</p>
                  <span>
                    <BiGitBranch /> {dados.public_repos}
                  </span>
                </div>
              </div>
            </div>
            <div className="repositoriesCont iBtm">
              {repositories.map((r) => {
                return (
                  <div key={r.name} className="repoCard">
                    <h1>{r.name}</h1>
                    <span className="description">
                      {r.description === "[deprecated]"
                        ? "No description"
                        : r.description}
                    </span>
                    <p>
                      <span>
                        <AiFillStar /> {r.stargazers_count}
                      </span>
                      <span>
                        <BiGitBranch /> {r.forks_count}
                      </span>
                      <span>
                        <BsFileEarmarkCodeFill /> {r.language}
                      </span>

                      <span>
                        <a target="_blank" href={r.html_url}>
                          <IoMdOpen />
                        </a>
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <footer>
              <a target="_blank" href={`https://github.com/LuisFsJr`}>
                <AiFillGithub />
              </a>
              <a
                target="_blank"
                href={`https://www.linkedin.com/in/luis-fernando-73b192207/`}
              >
                <BsLinkedin />
              </a>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
