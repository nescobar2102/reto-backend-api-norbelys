import { DynamoDB } from 'aws-sdk';

// Create a DynamoDB client instance
const dynamoDb = new DynamoDB.DocumentClient();

interface IUFilm {
  id: string;
  email:string;
  title: string;
  producer: string;
  director: string;
  createdAt: number,
  done: boolean,
}

class FilmModel {
  private tableName = 'FilmTable';

  // Create a new user
  async createFilm(newFilm: IUFilm) {
    const params = {
        TableName: this.tableName,
        Item: newFilm,
    };

    try {
        const response = await dynamoDb.put(params).promise();
        return { success: true, response }; // Retorna éxito y la respuesta de DynamoDB
    } catch (error) {
        console.error('Error al insertar el film:', error);
        return { success: false, error: 'qweqwe' }; // Captura el error y lo retorna
    }
}
 
  async getFilms(id: string): Promise<IUFilm | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    
    const result = await dynamoDb.get(params).promise();
    return result.Item as IUFilm | null;
  }

/*
   // Obtener un film por email
     async getUserByEmail(email: string): Promise<IUFilm | null> {
    const params = {
      TableName: this.tableName,
      IndexName: 'EmailIndex', // índice global secundario en DynamoDB para el email
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items ? (result.Items[0] as IUFilm) : null;
  }

  // Update an existing user
  async updateUser(filmId: string, updates: Partial<IUFilm>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { filmId },
      UpdateExpression: 'set #title = :title, #email=:email #producer = :producer, #director = :director',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#email': 'email',
        '#producer': 'producer',
        '#director': 'director', 
      },
      ExpressionAttributeValues: {
        ':title': updates.title,
        ':email': updates.email,
        ':producer': updates.producer,
        ':director': updates.director, 
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await dynamoDb.update(params).promise();
  }

  // Delete a film
  async deleteUser(filmId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { filmId },
    };
    await dynamoDb.delete(params).promise();
  }*/
}

export default FilmModel;