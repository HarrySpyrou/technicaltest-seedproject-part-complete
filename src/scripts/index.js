import "../styles/main.scss";
import ApiClient from "./ApiClient";
import Store from "./Store";
import Template from "./Template";
import ViewDeals from "./ViewDeals";
import ViewFilters from "./ViewFilters";

//gets stuff from db
const apiClient = new ApiClient();

//creates store/state of the app
const store = new Store();

//renders basic template
const template = new Template();

//renders the deals inside the pre-rendered template
const viewDeals = new ViewDeals(store, template);

//renders the Filters on the left.
const viewFilters = new ViewFilters(store);

store.subscribe(viewDeals);
store.subscribe(viewFilters);

//gets deals from the db.
apiClient.getDeals().then(data => {
  store.setDeals(data);
});
