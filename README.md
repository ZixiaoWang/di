# DI Module
Dependency Injection Module  
The module was inspired by di.js in @angular.

### Quick Navigate
1. Decorator  
    * [DI.Injectable](#DI.Injectable)
    * [DI.Inject](#DI.Inject)
    * [DI.Component](#DI.Component)
2. Global Variables
    * [DI.INJECTABLE_STORE](#DI.INJECTABLE_STORE)
    * [DI.INSTANCE_STORE](#DI.INSTANCE_STORE)
    * [DI.COMPONENT_STORE](#DI.COMPONENT_STORE)
3. Functions
    * [DI.boostrap](#DI.bootstrap)
    * [DI.construct](#DI.construct)
    * [DI.instanize](#DI.instanize)
4. Interface
    * [DI.componentConfig](#DI.componentConfig) (reference only)
    * [DI.providerConfig](#DI.providerConfig) (reference only)
4. [Examples](#Examples)
5. [Lisence](#Lisence)

### Cookbook
#### DI.Injectable
Use ```@DI.Injectable()``` decorator to register class to ```DI.INJECTABLE_STORE```  
Otherwise the class cannot be instanized by function ```DI.instanize```
### DI.Inject
Use ```@DI.Inject(...Providers)``` decorator to inject providers(functions) to class.   
The inputed providers will be used to construct instance of decorated class.  
<small>NOTE: the sequence of providers is NOT restricted</small>
### DI.Component
Use ```@DI.Component(config: DI.componentConfig)``` to decorate class.  
pass [DI.componentConfig](#DI.componentConfig) to decorator to determine the specific providers for constructing class instance.

### DI.bootstrap()
Example: ``` DI.bootstrap({ provider: [...Provider] }); ```
This is where **intanizing** started.  
The instanzing function will generate instaces of inputed Providers and store them to ```DI.INSTANCE_STORE``` as global instance.

### DI.construct(Component)
The function returns an instance which all dependencies has been injected.

### DI.instanize(InjectableClass)
The function returns an instance of registered injectable class.

### DI.componentConfig
```javascript
    {
        restrict?: boolean,
        provider: [Function|DI.providerConfig]
    }
```
<small>NOTE: In restrict mode, if the dependency instance cannot be found, it will throw an Error. Otherwise it will return null</small>

### DI.providerConfig
```javascript
    {
        provider: Function,
        useValue?: any,
        useClass?: Function,
        useExistInstance?: any
    }
```