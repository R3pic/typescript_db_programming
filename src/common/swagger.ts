import swaggerJsDoc, { type OAS3Options } from 'swagger-jsdoc';

const options: OAS3Options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Entertainment API',
            description: 'for Entertainment API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
        tags: [
            { name: 'Department', description: '부서' },
            { name: 'Employee', description: '관계자' },
            { name: 'Drama', description: '드라마' },
        ]
    },
    apis: ['./src/entertainment/*.ts'],
}

const openAPISpec= swaggerJsDoc(options);

export default openAPISpec;