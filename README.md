# DI Module <small>v2</small>
Dependency Injection Module  
The module was inspired by di.js in @angular.

### Quick Navigate
1. Decorator  
    * [Injectable](#Injectable)
    * [Inject](#Inject)
    * [Component](#Component)
2. Global Variables
    * [INJECTABLE_STORE](#INJECTABLE_STORE)
    * [INSTANCE_STORE](#INSTANCE_STORE)
    * [COMPONENT_STORE](#COMPONENT_STORE)
3. Functions
    * [boostrap](#bootstrap)
    * [construct](#construct)
    * [instanize](#instanize)
4. Interface
    * [componentConfig](#componentConfig) (reference only)
    * [providerConfig](#providerConfig) (reference only)
4. [Examples](#Examples)
5. [Lisence](#Lisence)

### Cookbook
#### Injectable
Use ```@Injectable()``` decorator to register class to ```INJECTABLE_STORE```  
Otherwise the class cannot be instanized by function ```instanize```
### Inject
Use ```@Inject(...Providers)``` decorator to inject providers(functions) to class.   
The inputed providers will be used to construct instance of decorated class.  
<small>NOTE: the sequence of providers is NOT restricted</small>
### Component
Use ```@Component(config: componentConfig)``` to decorate class.  
pass [componentConfig](#componentConfig) to decorator to determine the specific providers for constructing class instance.

### bootstrap()
Example: ``` bootstrap({ provider: [...Function] }); ```
This is where **intanizing** started.  
The instanzing function will generate instaces of inputed Providers and store them to ```INSTANCE_STORE``` as global instance.

### construct(Component)
The function returns an instance which all dependencies has been injected.

### instanize(InjectableClass)
The function returns an instance of registered injectable class.

### componentConfig
```javascript
    {
        restrict?: boolean,
        provider: [Function|providerConfig]
    }
```
<small>NOTE: In restrict mode, if the dependency instance cannot be found, it will throw an Error. Otherwise it will return null</small>

### providerConfig
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
    @Injectable()
    class Wheel { 
        showInfo(){ console.log('Wheel module is working OK...') };
    }

    @Injectable()
    class Engine {
        showInfo(){ console.log('Engine module is working OK...') };
    }

    @Injectable()
    class V12Engine {
        showInfo(){ console.log('V12 Engine starts!') }
    }


    @Component({
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


    boostrap({
        provider: [
            Wheel,
            Engine,
            V12Engine
        ]
    });

    var car = new Car( new Wheel(), new Engine() );
    var racingCar = constrct(Car);
```

### Console
```
    Wheel module is working OK...
    Engine module is working OK...
    Wheel module is working OK...
    V12 Engine starts!
```