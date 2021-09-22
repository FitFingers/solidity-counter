import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  makeStyles,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import Web3 from "web3";

import ABI from "util/abi.js";
import CONTRACT_ADDRESS from "util/address.js";

// ===================================================
// STYLES
// ===================================================

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: theme.palette.background.default,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    position: "relative",
    maxWidth: 180,
    width: "100%",
    height: "auto",
    padding: theme.spacing(1, 2),
  },
  tagline: {
    display: "flex",
    alignItems: "center",
  },
  main: {
    position: "relative",
    margin: "auto",
    maxWidth: theme.breakpoints.values.md,
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&>*": {
      margin: 8,
    },
  },
  title: {
    //
  },
  description: {
    //
  },
  code: {
    //
  },
  grid: {
    //
  },
  card: {
    //
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2, 3),
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
}));

// ===================================================
// COMPONENTS
// ===================================================

export default function Home() {
  const classes = useStyles();

  // active network
  const [network, setNetwork] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});

  console.log("DEBUG vars", {
    network,
    account,
    contract,
  });

  useEffect(() => {
    // init web3
    if (typeof window.web3 !== undefined) {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
        // new Web3(window.ethereum);
      );
    }

    // create contract
    if (network && network !== "private") {
      return console.log(
        "error",
        "This app only works on LOCALHOST. Please connect to the LOCALHOST network"
      );
    }

    console.log("DEBUG FX");

    if (!ABI) {
      return console.log("error", "No ABI");
    }
    if (!CONTRACT_ADDRESS) {
      return console.log("error", "No CONTRACT_ADDRESS");
    }

    const newContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
      gasLimit: 10000000,
    });

    setContract(newContract);
  }, [network]);

  // contract functions
  const connectWallet = useCallback(async () => {
    console.log("DEBUG fetching wallet", {});
    try {
      // connect and set the user's public key
      const [acc] = await window.web3.eth.requestAccounts();
      setAccount(acc);

      // connect to the network
      const connectedNetwork = await window.web3.eth.net.getNetworkType();
      setNetwork(connectedNetwork);

      // // connect to user's wallet
      // await connectAccount();
      // await connectNetwork();
    } catch (err) {
      console.debug("ERROR: couldn't connect wallet", { err });
    }
  }, []);

  const getNumber = useCallback(async () => {
    if (!network) {
      return console.log("error", `No contract method ${getNumber} defined!`);
    }

    alert(await contract.methods.getNumber().call());
  }, [contract.methods, network]);

  const setNumber = useCallback(async () => {
    if (!network) {
      return console.log("error", `No contract method ${setNumber} defined!`);
    }
    const n = await window?.prompt();
    await contract.methods
      .setNumber(Number(await n))
      .send({ from: account })
      .on("transactionHash", (txHash) => alert("TX UPDATE hash", txHash))
      .on("error", (e) => alert("TX UPDATE err", e))
      .on("receipt", ({ status }) => {
        alert("TX UPDATE receipt", status);
      });
  }, [account, contract.methods, network]);

  return (
    <Box className={classes.container}>
      <Head>
        <title>Address Book Whitelist</title>
        <meta
          name="description"
          content="Address book for Ethereum users. Add and remove contracts and send transactions to them"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar color="primary" position="relative">
        <Toolbar className={classes.toolbar}>
          <a href="https://www.jameshooper.io" target="_blank" rel="noreferrer">
            <Typography variant="h6">James Hooper</Typography>
          </a>
          <Box className={classes.tagline}>
            <Typography variant="h6">Active network:</Typography>
            <Box className={classes.logo}>My Logo</Box>
          </Box>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Button variant="contained" onClick={connectWallet}>
          Connect wallet ({network})
        </Button>
        <Button variant="contained" onClick={getNumber}>
          Read number
        </Button>
        <Button variant="contained" onClick={setNumber}>
          Set number
        </Button>
      </main>

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6">
            © {new Date().getFullYear()} James Hooper
          </Typography>
        </a>
      </footer>
    </Box>
  );
}
