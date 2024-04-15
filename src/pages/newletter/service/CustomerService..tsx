export const CustomerService = {
    getData() {
        return [
            {
              "id": 1001,
              "name": "Josephine Darakjy",
              "country": {
                "name": "Egypt",
                "code": "eg"
              },
              "company": "Chanay, Jeffrey A Esq",
              "date": "2019-02-09",
              "status": "proposal",
              "verified": false,
              "activity": 8,
              "representative": {
                "name": "Amy Elsner",
                "image": "amyelsner.png"
              },
              "balance": 82470
            },
            {
              "id": 1002,
              "name": "Art Venere",
              "country": {
                "name": "Canada",
                "code": "ca"
              },
              "company": "Chemel, James L Cpa",
              "date": "2017-05-13",
              "status": "qualified",
              "verified": true,
              "activity": 5,
              "representative": {
                "name": "Asiya Javayant",
                "image": "asiyajavayant.png"
              },
              "balance": 28330
            },
            {
              "id": 1003,
              "name": "Lenna Paprocki",
              "country": {
                "name": "France",
                "code": "fr"
              },
              "company": "Feltz Printing Service",
              "date": "2020-08-27",
              "status": "new",
              "verified": false,
              "activity": 22,
              "representative": {
                "name": "Xuxue Feng",
                "image": "xuxuefeng.png"
              },
              "balance": 45677
            },
            {
              "id": 1004,
              "name": "Donette Foller",
              "country": {
                "name": "Germany",
                "code": "de"
              },
              "company": "Printing Dimensions",
              "date": "2016-11-19",
              "status": "renewal",
              "verified": true,
              "activity": 18,
              "representative": {
                "name": "Sue Haugland",
                "image": "suehaugland.png"
              },
              "balance": 19385
            },
            {
              "id": 1005,
              "name": "Simona Morasca",
              "country": {
                "name": "Italy",
                "code": "it"
              },
              "company": "Chapman, Ross E Esq",
              "date": "2018-03-22",
              "status": "negotiation",
              "verified": false,
              "activity": 16,
              "representative": {
                "name": "Lisbeth Karpinski",
                "image": "lisbethkarpinski.png"
              },
              "balance": 12590
            },
            {
              "id": 1006,
              "name": "Mitsue Tollner",
              "country": {
                "name": "Japan",
                "code": "jp"
              },
              "company": "Morlong Associates",
              "date": "2015-07-11",
              "status": "unqualified",
              "verified": true,
              "activity": 12,
              "representative": {
                "name": "Lorrie Nestle",
                "image": "lorrienestle.png"
              },
              "balance": 21000
            },
            {
              "id": 1007,
              "name": "Leota Dilliard",
              "country": {
                "name": "South Korea",
                "code": "kr"
              },
              "company": "Commercial Press",
              "date": "2019-08-25",
              "status": "qualified",
              "verified": false,
              "activity": 4,
              "representative": {
                "name": "Debby Herwig",
                "image": "debbyherwig.png"
              },
              "balance": 65000
            },
            {
              "id": 1008,
              "name": "Sage Wieser",
              "country": {
                "name": "United States",
                "code": "us"
              },
              "company": "Truhlar And Truhlar Attys",
              "date": "2018-11-21",
              "status": "proposal",
              "verified": true,
              "activity": 20,
              "representative": {
                "name": "Jonas Alexander",
                "image": "jonasalexander.png"
              },
              "balance": 87000
            },
            {
              "id": 1009,
              "name": "Kris Marrier",
              "country": {
                "name": "United Kingdom",
                "code": "gb"
              },
              "company": "King, Christopher A Esq",
              "date": "2017-12-04",
              "status": "renewal",
              "verified": false,
              "activity": 14,
              "representative": {
                "name": "Roxanne Forbes",
                "image": "roxanneforbes.png"
              },
              "balance": 48000
            },
            {
              "id": 1010,
              "name": "Minna Amigon",
              "country": {
                "name": "Australia",
                "code": "au"
              },
              "company": "Dorl, James J Esq",
              "date": "2016-06-25",
              "status": "qualifi",
              "verified": true,
              "activity": 2,
              "representative": {
                "name": "Dorothy Badders",
                "image": "dorothybadders.png"
              },
              "balance": 76200
            },
            {
              "id": 1011,
              "name": "Minna Amigon",
              "country": {
                "name": "Australia",
                "code": "au"
              },
              "company": "Dorl, James J Esq",
              "date": "2016-06-25",
              "status": "unqualifi",
              "verified": true,
              "activity": 222,
              "representative": {
                "name": "Dorothy Badders",
                "image": "dorothybadders.png"
              },
              "balance": 76200
            },
            {
              "id": 102,
              "name": "Minna Amigon",
              "country": {
                "name": "Australia",
                "code": "au"
              },
              "company": "Dorl, James J Esq",
              "date": "2016-06-25",
              "status": "unqualifi",
              "verified": true,
              "activity": 222,
              "representative": {
                "name": "Dorothy Badders",
                "image": "dorothybadders.png"
              },
              "balance": 76200
            }
            // Continúa agregando más elementos según necesites...
          ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    },

    getCustomers(params: any) {
        const queryParams = params
            ? Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};