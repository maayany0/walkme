const fs = require('fs');
const HashMap = require('hashmap');
const MOCK_FATH = './server/mock/campaigns.json';
let all_campaigns = [];
const all_calls = new HashMap();
const calls_per_user = new HashMap();

const getCampaignsService1 = function(){
var campaigns;
fs.readFile(MOCK_FATH, 'utf8', function (err, data) {
  all_campaigns = JSON.parse(data).campaigns;

});
}
getCampaignsService1();


var campaignsServices = {
     getCampaignsService: function(id,cb){
		 let final = [];
         //getCampaignsService1(cb);
        let approvedCampaigns = [];
            all_campaigns.forEach(campaign=>{
                 if(campaign.thresholds.max_total !== undefined && campaign.thresholds.max_total !== null){ //if property exists 
				 let all_calls_counter = 0;
				 if(all_calls.has(campaign.id)){
					 all_calls_counter = all_calls.get(campaign.id);
				 }
                     if(campaign.thresholds.max_total > all_calls_counter ){
                    approvedCampaigns.push(campaign);
                }
                 }else{
                      approvedCampaigns.push(campaign);
                 }
               
            })
			 approvedCampaigns.forEach(approvedCampaign=>{
                 
                    if(approvedCampaign.thresholds.max_per_user ){
                        let count_per_user = 0;
                        if(calls_per_user.has(id)){
                            if(calls_per_user.get(id).has(approvedCampaign.id)){
                               count_per_user = calls_per_user.get(id).get(approvedCampaign.id)
                            }
                        }
                        if(approvedCampaign.thresholds.max_per_user > count_per_user ){
                            final.push(approvedCampaign);
                            if(!all_calls.has(approvedCampaign.id)){
                                all_calls.set(approvedCampaign.id,1)
                            }
                            else{
                                all_calls.set(approvedCampaign.id, all_calls.get(approvedCampaign.id)+1)
                            }
							if(calls_per_user.has(id)){
                                if(calls_per_user.get(id).has(approvedCampaign.id)){
                                    calls_per_user.get(id).set(approvedCampaign.id,calls_per_user.get(id).get(approvedCampaign.id)+
                                    1)
                                }else{
                                    calls_per_user.get(id).set(approvedCampaign.id,1);
                                }
                            }else{
                                calls_per_user.set(id,new HashMap());
                                calls_per_user.get(id).set(approvedCampaign.id,1);
                            }
							
                        }
                    }else{
						final.push(approvedCampaign);
                        if(!all_calls.has(approvedCampaign.id)){
                            all_calls.set(approvedCampaign.id,1)
                        }
                            else{
                                all_calls.set(approvedCampaign.id, all_calls.get(approvedCampaign.id)+1)
                            }
                            if(calls_per_user.has(id)){
                                if(calls_per_user.get(id).has(approvedCampaign.id)){
                                    calls_per_user.get(id).set(approvedCampaign.id,calls_per_user.get(id).get(approvedCampaign.id)+
                                    1)
                                }else{
                                    calls_per_user.get(id).set(approvedCampaign.id,1);
                                }
                            }else{
                                calls_per_user.set(id,{});
                                calls_per_user.get(id).set(approvedCampaign.id,1);
                            }
                    }
                })
				cb(final);
         
     }
}


module.exports = campaignsServices