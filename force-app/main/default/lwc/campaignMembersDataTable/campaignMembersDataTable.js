import { LightningElement, api, wire, track } from 'lwc';
import campaignMembers from '@salesforce/apex/CampaignMembersDataTableController.campaignMembersQuery';
import sitePath from '@salesforce/community/basePath';

export default class CampaignMembersDataTable extends LightningElement {
    @api recordId;
    data;
    @track sortBy;
    @track sortDirection;
    columns = [
        { label: 'First Name', fieldName: 'url',sortable: "true", type: 'url', typeAttributes: {label: { fieldName: 'FirstName' }, target: '_blank'} },
        { label: 'Status', fieldName: 'status', type: 'text', sortable: "true" },
        { label: 'Email', fieldName: 'email', type: 'email', sortable: "true" },
        { label: 'Phone', fieldName: 'phone', type: 'text', sortable: "true" },
        { label: 'Employer', fieldName: 'employer', type: 'text', sortable: "true"},
    ];
    
    @wire(campaignMembers, { campaignId: '$recordId'})
    wiredData({ data, error }) {
        console.log('Data1 ', JSON.stringify(data));

        if (data) {
            console.log('Data ', JSON.stringify(data));
            let campaignMembersData = [];

            for (let i = 0; i < data.length; i++) {
                let cm = {Id: data[i].Id ,FirstName : data[i].FirstName + " " + data[i].LastName,
                          url: `${sitePath}/detail/${data[i].Id}`, 
                          status : data[i].Status, 
                          email: data[i].Email, 
                          phone: data[i].Phone , 
                          employer: data[i].Contact.Employer__c,};

                campaignMembersData.push(cm);
            }

            this.data = campaignMembersData;  
        }
        else{
            console.log('Error',error);
        }
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
            return a[fieldname];
        };

        let isReverse = direction === 'asc' ? 1: -1;

        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';

            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
            return a[fieldname];
        };

        let isReverse = direction === 'asc' ? 1: -1;

        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';

            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }
}


