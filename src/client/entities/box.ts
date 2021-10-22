import * as THREE from 'three'
import BaseEntity from './baseEntity'
import Logger from '../utils/logger'

interface IBox extends BaseEntity{
    w: number;
    h: number;
}

class Box implements IBox {

    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;

    logger: Logger = Logger.Instance();

    constructor({x = 0, y = 0, w = 0, h = 0}:
                {x?: number, y?: number, w?: number, h?: number} = {})
    {
        this.x = x;
        this.x = x;
        this.x = x;
        this.x = x;

        this.logger.log("Creating a Box");
    }

    update() {
    }

    render() {
    }
}


export default Box;