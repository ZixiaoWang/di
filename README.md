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
Example: ``` DI.bootstrap({ provider: [...Function] }); ```
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
The priority is useClass > useValue > useExistInstance

## Examples
<small>The index.web.js has exposed a global variable ```DI```, use &lt;script&gt; tag to import index.web.js</small>

### index.html
```html
    <html>
        <head></head>
        <body>
            <script src="path/to/your/index.web.js"></script>
            <script src="your/own/js/my.js"></script>
        </body>
    </html>
```

### my.ts
```javascript
    @DI.Injectable()
    class Wheel { 
        showInfo(){ console.log('Wheel module is working OK...') };
    }

    @DI.Injectable()
    class Engine {
        showInfo(){ console.log('Engine module is working OK...') };
    }

    @DI.Injectable()
    class V12Engine {
        showInfo(){ console.log('V12 Engine starts!') }
    }


    @DI.Component({
        provider: [
            { provider: Engine, useClass: V12Engine }
        ]
    })
    class Car {
        constructor( private wheel: Wheel, private engine: V12Engine ) {
            this.wheel.showInfo();
            this.engine.showInfo();
        }
    }


    DI.boostrap({
        provider: [
            Wheel,
            Engine,
            V12Engine
        ]
    });

    var car = new Car( new Wheel(), new Engine() );
    var racingCar = DI.constrct(Car);
```

### Console
```
    Wheel module is working OK...
    Engine module is working OK...
    Wheel module is working OK...
    V12 Engine starts!
```