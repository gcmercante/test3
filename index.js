const axios = require('axios');

(async () => {
  console.log(await bodyTemperature('Dr Arnold Bullock', 2));
})()

async function bodyTemperature(doctorName, diagnosisId) {
    const temperature = [];
    const { data } = await axios.get('https://jsonmock.hackerrank.com/api/medical_records')

    if(data.total_pages > 1) {
      for (let i = 1; i < data.total_pages; i++) {
        const { data: result } = await axios.get(`https://jsonmock.hackerrank.com/api/medical_records?page=${i}`)
        
        result.data.forEach(el => {
          if(el.doctor.name == doctorName && el.diagnosis.id == diagnosisId) {
            temperature[0] = checkIfTemperatureIsLower(temperature[0], el.vitals.bodyTemperature)
            temperature[1] = checkIfTemperatureIsHigher(temperature[1], el.vitals.bodyTemperature)
          }
        })
      }
    } else {
      data.data.forEach(el => {
        if(el.doctor.name == doctorName && el.diagnosis.id == diagnosisId) {
          temperature[0] = checkIfTemperatureIsLower(temperature[0], el.vitals.bodyTemperature)
          temperature[1] = checkIfTemperatureIsHigher(temperature[1], el.vitals.bodyTemperature)         
        }
      })
    }

    return temperature;
}

function checkIfTemperatureIsLower(current, last) {
  if(current > last || !current) {
    return last;
  }

  return current;
}

function checkIfTemperatureIsHigher(current, last) {
  if(current < last || !current) {
    return last;
  }

  return current;
}