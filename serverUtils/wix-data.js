const { myWixClient } = require('./wix-client');


const reduceCount = async (mobile, type) => {
  const leads = await myWixClient.items
  .queryDataItems({ dataCollectionId: 'Leads' })
  .find(
    { fields: { "mobile": mobile }}
  );

  const dataItemId = leads._items[0].data._id;

  const dataItem = await myWixClient.dataItems.getDataItem(dataItemId, {consistentRead: false, dataCollectionId: "Leads"});
  
  if (type === 'blog') {
    dataItem.data.remaining_blog_usage_count--;
  } else {
    dataItem.data.remaining_logo_usage_count--;
  }
  
  const options = { dataCollectionId: "Leads", dataItem: {
    data: dataItem.data
  }};
  
  await myWixClient.dataItems.removeDataItem(dataItemId, {dataCollectionId: "Leads"});
  delete dataItem.data._id
  await myWixClient.dataItems.saveDataItem(options);
  return type === 'blog' ? dataItem.data.remaining_blog_usage_count : dataItem.data.remaining_logo_usage_count;
}

/*
  @params - user mobile number
  @params - email user email id
  @params - type 'blog' or 'logo'
*/
async function fetchLeads(mobile, email, type) {
  let leads = false;
  
  try {
     leads = await myWixClient.items
                                  .queryDataItems({ dataCollectionId: 'Leads', consistentRead: false })
                                  .eq("mobile", mobile ).find();
  } catch(e) {
    console.log(e)
  }

  if (leads && leads._items.length > 0) {
    console.log(leads._items[0].data.remaining_blog_usage_count)
    return type === 'blog' ? leads._items[0].data.remaining_blog_usage_count : leads._items[0].data.remaining_logo_usage_count
  } 
  return false
}

async function putLead(name, email, mobile) {
  let item = {
    name: name,
    mobile: mobile,
    email_id: email,
    remaining_blog_usage_count: 3,
    remaining_logo_usage_count: 5
  }
  try {
    await myWixClient.dataItems.saveDataItem({dataCollectionId: 'Leads', dataItem: {data: item}})
    return true
  } catch (e) {
    return false
  }
}

module.exports = { fetchLeads, reduceCount, putLead }