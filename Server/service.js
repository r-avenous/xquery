const axios = require('axios');
const basex = require('basex');

let access_token = "";
let timestamp;



async function generateToken() {

    const api_url = 'https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.3f15e8e5406ea3eae5b17b109309abff.cdc4c37b5eb61c5b16b7b472936113f5&client_id=1000.50QXN2ET9PHEZ2OFCFL5XCQD7JLCDF&client_secret=e0a71e0d46a203c897b6e3ee75c8ea6866e0af3253&grant_type=refresh_token';

    const token = await axios.post(api_url)


    return token.data;



}

async function xqueryData(query) {

    console.log("function executeQuery() {");

    var client = new basex.Session("localhost", 1984, "admin", "admin");
    basex.debug_mode = false;

    function print(err, reply) {
        if (err) {
            console.log("Error: " + err);
        } else {
            var t2 = new Date();
            console.log("Execution completed in ", t2 - t0, " milliseconds.");
            console.dir(reply);
        }
        console.log("Result: " + reply.result);
    };

    var t0 = new Date();
    client.execute("open database_test", print);

    xqeuryGot = query;
    console.log(xqeuryGot);
    try {
        const result = await new Promise((resolve, reject) => {
            client.execute(xqeuryGot, (err, reply) => {
                if (err) {
                    console.log("Error: " + err);
                    resolve(""); // Return empty string if XQuery fails to execute
                } else {
                    resolve(reply.result);
                }
                print(err, reply);
            });
        });

        client.close(function () {
            var t2 = new Date();
            console.log("Closed in ", t2 - t0, " milliseconds.");
        });
        var t1 = new Date();
        console.log("Commands sent in ", t1 - t0, " milliseconds.");
        if (result == "") {
            return "No results found.";
        }
        return result;
    } catch (error) {
        console.log("Error occurred while executing XQuery: ", error);
        client.close(function () {
            var t2 = new Date();
            console.log("Closed in ", t2 - t0, " milliseconds.");
        });
        throw error;
    }

}


async function getDataID(access_token_param_from_user, email) {

    var data = '{\n    "data": [\n        {\n            "Email": ' + email + ',\n            \n}\n    ],\n    "duplicate_check_fields": [\n        "Email",\n  ],\n    "trigger":[ "workflow"]\n}';
    var config = {
        method: 'post',
        url: 'https://recruit.zoho.com/recruit/v2/Candidates/upsert',
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
            'Content-Type': 'text/plain',
        },
        data: data
    };


    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }


}

async function postDataBasic(access_token_param_from_user, Email, Last_Name, First_Name, City, Country, Mobile, Linkedin, Whatsapp_Number) {



    let body = {
        data: [
            {
                Email: Email,
                Last_Name: Last_Name,
                First_Name: First_Name,
                Mobile: Mobile,
                Whatsapp_Number: Whatsapp_Number,
                Is_the_Basic_Info_Section_filled: "true",
                Linkedin: Linkedin,
                Candidate_Stage: "In Review",
                City: City,
                Country: Country
            }
        ],
        duplicate_check_fields: [
            "Email",
        ],
        trigger: ["workflow"]
    }
    var config = {
        method: 'post',
        url: 'https://recruit.zoho.com/recruit/v2/Candidates/upsert',
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
        },
        data: JSON.stringify(body)
    };

    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }

}


async function postDataAcad(access_token_param_from_user, Email, Test, Resume_link, Image, Score, Current_GPA, Code_Chef, Code_Forces, Leet_Code, University, Field_s_of_Study, Graduation_Year) {



    let body = {
        data: [
            {
                Email: Email,
                Test: Test,
                Is_Education_Section_filled: "true",
                Resume_link: Resume_link,
                Image: Image,
                Score: Score,
                Current_GPA: Current_GPA,
                Code_Chef: Code_Chef ,
                Code_Forces: Code_Forces,
                Leet_Code: Leet_Code,
                University: University,
                Field_s_of_Study: Field_s_of_Study,
                Graduation_Year: Graduation_Year
}
    ],
duplicate_check_fields: [
    "Email",
],
    trigger: ["workflow"]
}








var config = {
    method: 'post',
    url: 'https://recruit.zoho.com/recruit/v2/Candidates/upsert',
    headers: {
        'Authorization': 'Zoho-oauthtoken ' + access_token,
    },
    data: JSON.stringify(body)
};

    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }

}

async function postWorkAndProjData(access_token_param_from_user, idForAPICalls, Work_Experience, Projects) {



    let body = {
        data: [
            {
                Work_Experience: Work_Experience,
                Projects: Projects
            }
        ]
    }

    var config = {
        method: 'PUT',
        url: `https://recruit.zoho.com/recruit/v2/Candidates/${idForAPICalls}`,
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
        },
        data: JSON.stringify(body)
    };
    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }

}



async function postSkillCheck(access_token_param_from_user, Email, Is_the_Work_section_filled, Skill_Set ) {



    let body = {
        data: [
            {
                Email: Email,
                Is_the_Work_section_filled: Is_the_Work_section_filled,
                Skill_Set: Skill_Set
            }
        ],
        duplicate_check_fields: [
            "Email",
        ],
        trigger: ["workflow"]
    }
    var config = {
        method: 'post',
        url: 'https://recruit.zoho.com/recruit/v2/Candidates/upsert',
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
        },
        data: JSON.stringify(body)
    };

    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }

}




async function postAssociateCandi(access_token_param_from_user, idForAPICalls) {



    let body = {
        data: [
            {
                jobids: ["696699000000515091"],
                ids: [idForAPICalls],
                comments: "Record successfully associated"
            }
        ]
    }


    var config = {
        method: 'PUT',
        url: "https://recruit.zoho.com/recruit/v2/Candidates/actions/associate",
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
        },
        data: JSON.stringify(body)
    };

    const response = await axios(config);

    return response.data;


}

async function getWorkExpData(access_token_param_from_user, idForAPICalls) {

    let url = `https://recruit.zoho.com/recruit/v2/Candidates/${idForAPICalls}?fields=Work_Experience,Projects`

    var config = {
        method: 'get',
        url: url,
        headers: {
            'Authorization': 'Zoho-oauthtoken ' + access_token,
        },
        
    };

    try {
        const response = await axios(config)
        return response.data;
    }
    catch (error) {
        console.log(error.response.data.code);
        if (error.response.data.code == "INVALID_TOKEN") {
            return {

                code: "INVALID_TOKEN",

            };
        }
    }



}




async function generateStaticToken() {

let token=await generateToken();
access_token=token.access_token;
console.log(access_token);
console.log("access_token is generated");
}







module.exports = { generateToken,xqueryData, getDataID, postDataBasic, postDataAcad , postWorkAndProjData, postSkillCheck, postAssociateCandi, getWorkExpData,access_token,timestamp,generateStaticToken}

