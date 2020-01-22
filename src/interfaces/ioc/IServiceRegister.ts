import { Container } from 'inversify';

export interface IServiceRegister {
    register(container: Container): void;
}
