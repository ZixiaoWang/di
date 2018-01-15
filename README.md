# DI Module
Dependency Injection Module  
The module was inspired by di.js in @angular.

### Quick Navigate
1. [Cookbook](#Cookbook)
2. [Examples](#Examples)
3. [Lisence](#Lisence)

### Cookbook
##### DI.INJECTABLE_STORE
A global variable which stores all registered **injectable classes**.
##### DI.INSTANCE_STORE
A global variable which stores all bootstraped **injectable classes** and its **instance**.
##### DI.COMPONENT_STORE
A global variable which stores all decorated **component classes** and its configurations.
##### DI.Injectable()
Use @DI.Injectable() decorator to decorate a class and register the class in ``` DI.INJECTABLE_STORE ``` object.   
<code>DI.INJECTABLE_STORE</code> is a global object which stores all registered injectable class.
##### DI.Inject(Provider, Provider, Provider)
The @DI.Inject(Fn1, Fn2, Fn3...) decorator indicates what provider will be used to instanize the class.   

