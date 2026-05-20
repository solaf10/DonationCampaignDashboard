const config = {
  baseUrl: 'http://127.0.0.1:8000/api',
  login: 'login',
  governments: {
    all: 'governorates/all',
    search: 'governorate/search',
    add: 'governorate/add',
    edit: 'governorate/update',
  },
  cities: {
    all: 'city/index',
    search: 'city/search',
    add: 'city/add',
    edit: 'city/update',
    filter: 'city/filter',
  },
  areas: {
    all: 'district/index',
    search: 'district/search',
    add: 'district/add',
    edit: 'district/update',
    filter: 'district/filter',
  },
  activities: 'api/activities',
  contact: 'api/contactForms/contact-us/',
};
export default config;
