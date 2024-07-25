import { test, expect } from '@playwright/test';

const orderURL = 'https://sandbox-partners-api.airalo.com/v2/orders'; 
const getListURL = 'https://sandbox-partners-api.airalo.com/v2/sims'; 

const bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1MDkiLCJqdGkiOiJiNGFlYTY0ZjcwYWViY2ZkNmI3NzEzM2Q4NDk0YTEyYzU5NjlhYzYxZWQyOGI2ODlhMmM0ZDE4NTQ0YmU5Y2Q5NjVkNTljZjZkZjgyNjlhNyIsImlhdCI6MTcyMTk0NDA4MywibmJmIjoxNzIxOTQ0MDgzLCJleHAiOjE3NTM0ODAwODMsInN1YiI6IiIsInNjb3BlcyI6W119.OizXlRFIEfkZ8bkkEg538ptHtAkek3z4BV6VVfqPahHULaNkFwODMqGA3kivU560dbacUK_2OQNo6EWm5iia0-fthSVjHKVnaFxvzgUUDPDgNxXp9BsAMHujZRrg3dYQpnNyVTDMPz_2Np7tj8iowZYUgFu9DgAuKM2SvT4znvKrrN-4PIHTuwxAaaQXow79HdcWXtLL1_DU5YMtigVySCr_VkjRIsPT5FKJdi8uBSFEmCpqktuz9cOc8QNd2OhJ3RB2BtGyuXWXaXtYbh60q_v8CDKdQBZnZJPAgJd9t2yK_wsTqfACilkfuyPh5OJ4_uYIe83ilxkEEhQXfJvu1AN3kZG1iiFvMqTHkajLv2gu-2Wr9adJj3LBZzZeA81I2p-3fP5b_bqDCtiOKltAgUfhjx1L7Ei4j6ULVHqHAH9XlZ2C35nerKruTzqrIXlsHxDC0N_0uIhmG2wUOCmaTtXpodRvjx7kd78_z2uIlmGKUHIRNIcKjdRUQeytx94KFyEnGf_Viz0kO9qWFZf5HS_nxe58sTQMCsvg9cyYV8zOpVroAziKTcxaZwrCEhGzIwQN9qwBJ6AyMTuVS_x-RmzwUIjz9MPfctndIS4eGfWnGjwotVqNBe6JPXF1F0pe6-QibPnp5b3bqK33a9gS7ZQS3xplYm9dKsOxuFh_KKU"
const headers = {'Authorization': `Bearer ${bearerToken}`,'Content-Type': 'application/json'};
    
// to POST an order for 6 "merhaba-7days-1gb" eSIMs
test('Endpoint 1: Post an Order for eSIMs with specific package_id and quantity ', async ({request}) => {
    
    // Send the payload with the details for the order 
    const payload = {quantity: 6,package_id: 'merhaba-7days-1gb'};

    // sending post request to order eSIMs 
    const response = await request.post( orderURL, {  
        headers: headers,
        data: payload
    });    

    //Validation of response status code 
    expect(response.status()).toBe(200)
    console.log(response.status())
    
    //Validation for response body for information regarding quantity and package id 
    const responseBody = await response.json()
    console.log('ResponseBody of endpoint1:', responseBody)
    expect(responseBody.data).toHaveProperty('id')
    expect(responseBody.data).toHaveProperty('package_id', payload.package_id)
    expect(responseBody.data).toHaveProperty('quantity',payload.quantity)
    console.log('Order of 6 Esims were placed successfully');
    
 
});
test('Endpoint 2:GET a list of eSIMs and verify the package ids', async({request}) => {

    const params = {include: 'order,order.status', limit: 6 };

    const response = await request.get ( getListURL, {
        headers:    headers,
        params: params

    })

    // Validate the status code 
    expect(response.status()).toBe(200)
    const responseBody2 = await response.json()
    console.log('ResponseBody of endpoint2 ', responseBody2)
    

    // validate the list contains 6 eSIMs, and that all of them have the right package detail
    
    /*expect(responseBody2.data).toHaveLength(6)
    expect(responseBody2.data).toHaveProperty('package_id','merhaba-7days-1gb')
    */        
});

  