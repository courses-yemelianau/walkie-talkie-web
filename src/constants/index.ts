export enum Env {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Staging = 'staging'
}

export enum Status {
    Idle,
    Loading,
    Succeeded,
    Failed
}

export const {
    NODE_ENV = Env.Development
} = process.env;
