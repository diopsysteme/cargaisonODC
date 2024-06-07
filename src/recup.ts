const fetchData = async () => {
  try {
    const response = await fetch('link', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }

    const data = await response.json();
    console.log('Données récupérées:', data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

fetchData();


const saveData = async (data: any) => {
  try {
    const response = await fetch('link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Réponse du serveur:', responseData);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
  }
};

const dataToSave = {
  key: 'value',
  anotherKey: 'anotherValue'
};

saveData(dataToSave);



