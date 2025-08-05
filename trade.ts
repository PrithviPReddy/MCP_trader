import { KiteConnect } from "kiteconnect";

const apiKey = "______________";
// const apiSecret = "_____________";//this is to verify or generate the access token
// const requestToken = "___________"; //Gives you power to place trade on other's zerodha account(other = people who use your app once you make it public)
//remember a request token is valid for for 1 use only 
//for a long term use you need to use the access token
let accessToken = "___________";
const kc = new KiteConnect({ api_key: apiKey });//Initializes an instance of kiteconnect object

console.log(kc.getLoginURL());// to get the login url for the user to login to the kite app


async function init() {
  try {
    // await generateSession();//generating a short access token with the requestoken and api secret
    kc.setAccessToken(accessToken);
    // await getProfile();//getting the profile of the user
  } catch (err) {
    console.error(err);
  }
}

// async function generateSession() {
//   try {
//     const response = await kc.generateSession(requestToken, apiSecret); //generates a session is used to generate access token
//     console.log(response.access_token);//show the access token in the console
//     //to log the access token in the console you have to update the requestToken once and then get the access token
//     //and then set the access token in the kiteconnect object
//     kc.setAccessToken(response.access_token);
//     console.log("Session generated:", response);
//   } catch (err) {
//     console.error("Error generating session:", err);
//   }
// }

export async function placeOrder(stock: string, qty: number, side: "BUY" | "SELL") {
  try {
    const order = await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol: stock,
      transaction_type: side,
      quantity: qty,
      product: "CNC",
      order_type: "MARKET",
    });
    console.log(` ${side} order placed successfully:`, order);
  } catch (err) {
    console.error(`Error placing ${side} order:`, err);
    throw err;
  }

  export async function getPositions(){
  try {
    const positions = await kc.getPositions();
    let allHolding = "";
    if (positions.net && positions.net.length > 0) {
      positions.net.forEach((holding: any) => {
        allHolding += `Stock: ${holding.tradingsymbol}, Quantity: ${holding.quantity}, Current Price: ${holding.price}\n`;
      });
    }

    return allHolding || "No positions found";
  } catch (err) {
    console.error("Error getting positions:", err);
    return "Error retrieving positions";
  }
}
// Initialize the API calls
// init();
