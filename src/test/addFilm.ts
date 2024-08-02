import { addFilm } from './your-file-name';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';

jest.mock('aws-sdk', () => {
  const mocks = {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({}),
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn().mockReturnValue(mocks),
    },
  };
});

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid'),
}));

describe('addFilm', () => {
  const mockEvent: any = {
    body: JSON.stringify({
      title: 'Test Film',
      producer: 'Test Producer',
      director: 'Test Director',
    }),
  };

  it('should add a new film to the DynamoDB table', async () => {
    const response = await addFilm(mockEvent);

    expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalledWith();
    expect(v4).toHaveBeenCalled();
    expect(mocks.put).toHaveBeenCalledWith({
      TableName: 'FilmTable',
      Item: {
        id: 'test-uuid',
        title: 'Test Film',
        producer: 'Test Producer',
        director: 'Test Director',
        createdAt: expect.any(Date),
        done: false,
      },
    });
    expect(mocks.promise).toHaveBeenCalled();

    expect(response).toEqual({
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        data: {
          id: 'test-uuid',
          title: 'Test Film',
          producer: 'Test Producer',
          director: 'Test Director',
          createdAt: expect.any(Date),
          done: false,
        },
        message: 'The resource has been created successfully!.',
      }),
    });
  });

  it('should handle errors and return a 500 status code', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mocks.promise.mockRejectedValue(new Error('DynamoDB error'));

    const response = await addFilm(mockEvent);

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred!.',
      }),
    });
  });
});