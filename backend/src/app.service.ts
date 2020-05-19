import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';

let configurationOptions: ServiceConfigurationOptions = {
  region: 'us-east-1',
};

if (process.env.NODE_ENV === 'development') {
  configurationOptions.endpoint = 'http://localhost:8000';

  AWS.config.update(configurationOptions);
} else {
  AWS.config.update(configurationOptions);
}

const dynamo = new AWS.DynamoDB.DocumentClient();
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getData(): Promise<any> {
    try {
      let result = await dynamo.scan({ TableName: 'covid-data' }).promise();
      return result.Items || [];
    } catch (e) {
      console.log(e);
    }
  }
}
