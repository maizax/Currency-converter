import React, { useEffect, useState, useCallback } from "react";
import Loading from "../UI/Loading";
import classes from "./CurrencyInfo.module.css";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

const BASE_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=c89e24bc-d6b9-488f-8d36-aa5e6bb8cdb4";

function CurrencyInfo() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const currencyInfoHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    currencyInfoHandler();
  }, [currencyInfoHandler]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((info) => {
      return (
        info.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        info.symbol.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    if (searchWord === "") {
      setSearch([]);
    } else {
      setSearch(newFilter);
    }
  };

  const clearInput = () => {
    setSearch([]);
    setWordEntered("");
  };

  return (
    <div className={classes.center}>
      {error && <p>{error}</p>}
      {loading && !error && (
        <div className={classes.loadingTop}>
          <Loading />
        </div>
      )}

      {!loading && !error && search && (
        <div>
          <h1 className={classes.h1}>Crypto information</h1>
          <div className={classes.search}>
            <div className={classes.searchInputs}>
              <input
                type="text"
                placeholder="Search for..."
                onChange={handleFilter}
                value={wordEntered}
              ></input>
              <div className={classes.searchIcon}>
                {search.length !== 0 || wordEntered.length > 0 ? (
                  <AiFillCloseCircle id="clearBtn" onClick={clearInput} />
                ) : (
                  <BiSearch />
                )}
              </div>
            </div>
          </div>

          {search.map((info, index) => (
            <ul key={index} className={classes.dataResult}>
              Coin market cap rank:{" "}
              <span className={classes.answer}>{info.cmc_rank}</span>
              Name: <span className={classes.answer}>{info.name}</span>
              Symbol: <span className={classes.answer}>{info.symbol}</span>
              Price:{" "}
              <span className={classes.answer}>
                {info.quote.USD.price.toFixed(4)}
              </span>{" "}
              USD Price change in last 30 days:{" "}
              <span className={classes.answer}>
                {info.quote.USD.percent_change_30d.toFixed(0)}
              </span>{" "}
              %<br></br>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencyInfo;
