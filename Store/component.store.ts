export class ComponentStore {

    private map: Map<any, any[]>;

    constructor() {
        this.map = new Map<any, any[]>();
    }

    has(component: any): boolean {
        return this.map.has(component);
    }

    get(component: any): Array<any> {
        return this.getArguments(component);
    }

    register(componnet: any, args?: Array<any>) {
        this.map.set(componnet, args || []);
    }

    update(component: any, args: Array<any>) {
        this.map.set(component, args);
    }

    getArguments(component: any): any[]{
        return this.map.get(component) || [];
    }
}

export const COMPONENT_STORE = new ComponentStore();

/**
 * Component Store
 * Data Structure
 *  [
 *      <Component, [instance, instance, instance, instance]>,
 *      <Component, [instance, instance]>,
 *      <Component, [instance, instance, instance]>
 *      ...
 *  ]
 */