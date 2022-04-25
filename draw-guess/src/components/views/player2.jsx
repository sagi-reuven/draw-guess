import axios from "axios";
import { useEffect, useState } from "react";

const Player2 = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = axios.get("http://localhost:4000/game/drawing");
      const result = await response;
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.nativeEvent.target[0].value);
    const word = e.nativeEvent.target[0].value;
    const response = await axios.post("http://localhost:4000/game/guess", {
      word,
    });
    if (response.data === "You Are Correct!!! You Won") {
      alert(response.data);
      window.location = "/";
    } else {
      alert(response.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col-12">
            <h1>Other Player Is Drawing</h1>
          </div>
        </div>
        <div className="row text-center mt-5">
          <div className="col-12">{<img src={data} alt="" />}</div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-10">
              <form className="gy-5 mt-3 text-center" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">Guess The Drawing</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group mt-5">
                  <input
                    type="submit"
                    value="Guess"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player2;
