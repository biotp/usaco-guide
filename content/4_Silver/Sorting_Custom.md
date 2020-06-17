---
id: sorting-custom
title: "Sorting with Custom Comparators"
author: Darren Yao, Siyong Huang
prerequisites: 
 - 
     - Silver - Introduction to Sorting  
---

Both Java and C++ have built-in functions for sorting. However, if we use custom objects, or if we want to sort elements in a different order, then we'll need to use a **custom comparator**. 

<!-- END DESCRIPTION -->

## Comparators

Normally, sorting functions rely on moving objects with a lower value in front of objects with a higher value if sorting in ascending order, and vice versa if in descending order. This is done through comparing two objects at a time.

### C++

What a comparator does is compare two objects as follows, based on our comparison criteria:

 - If object $x$ is less than object $y$, return `true`
 - If object $x$ is greater than or equal to object $y$, return `false`
 
Essentially, the comparator determines whether object $x$ belongs to the left of object $y$ in a sorted ordering. A comparator **must** return false for two identical objects (not doing so results in undefined behavior and potentially RTE).
 
In addition to returning the correct answer, comparators should also satisfy the following conditions:

 - The function must be consistent with respect to reversing the order of the arguments: if $x \neq y$ and `compare(x, y)}`is positive, then `compare(y, x)` should be negative and vice versa
 - The function must be transitive. If `compare(x, y)` is true and `compare(y, z)` is true, then `compare(x, z)}` should also be true. If the first two compare functions both return `false`, the third must also return `false`.

A generic way of implementing a custom comparator is to define a function. For our example, we'll use a `struct` of a Person that contains a person's height and weight, and sort in ascending order by height. A `struct` is essentially a user-defined data structure: 

```cpp
struct Person {
    int height;
    int weight;
};
int main() {
    Person p;
    p.height = 60; // assigns 60 to the height of p
    p.weight = 100; // assigns 100 to the weight of p
}
```

Let's say we have an array `Person arr[N]`. To sort the array, we need to make custom comparator which will be a function, and then pass the function as a parameter into the build-in sort function: 

```cpp
bool cmp(Person a, Person b) {
    return a.height < b.height; 
}

int main() {
    sort(arr, arr+N, cmp); // sorts the array in ascending order by height
}
```

If we instead wanted to sort in descending order, this is also very simple. Instead of the `cmp` function returning `return a.height < b.height;`, it should do `return a.height > b.height;`.

### Java

What a `Comparator` does is compare two objects as follows, based on our comparison criteria:

- If object $x$ is less than object $y$, return a negative number.
- If object $x$ is greater than object $y$, return a positive number.
- If object $x$ is equal to object $y$, return 0.

In addition to returning the correct number, comparators should also satisfy the following conditions:
- The function must be consistent with respect to reversing the order of the arguments: if $compare(x, y)$ is positive, then $compare(y, x)$ should be negative and vice versa.
- The function must be transitive. If $compare(x, y) > 0$ and $compare(y, z) > 0$, then $compare(x, z) > 0$. Same applies if the compare functions return negative numbers.
- Equality must be consistent. If $compare(x, y) = 0$, then $compare(x, z)$ and $compare(y, z)$ must both be positive, both negative, or both zero. Note that they don't have to be equal, they just need to have the same sign.

Java has default functions for comparing `int`, `long`, `double` types. The `Integer.compare()`, `Long.compare()`, and `Double.compare()` functions take two arguments $x$ and $y$ and compare them as described above.

Now, there are two ways of implementing this in Java: `Comparable`, and `Comparator`. They essentially serve the same purpose, but `Comparable` is generally easier and shorter to code. `Comparable` is a function implemented within the class containing the custom object, while `Comparator` is its own class. For our example, we'll use a `Person` class that contains a person's height and weight, and sort in ascending order by height.

If we use `Comparable`, we'll need to put `implements Comparable<Person>` into the heading of the class. Furthermore, we'll need to implement the `compareTo` method. Essentially, `compareTo(x)` is the `compare` function that we described above, with the object itself as the first argument, or `compare(self, x)`.

```java
static class Person implements Comparable<Person>{
    int height, weight;
    public Person(int h, int w){
        height = h; weight = w;
    }
    public int compareTo(Person p){
        return Integer.compare(height, p.height);
    }
}
```

When using Comparable, we can just call `Arrays.sort(arr)` or `Collections.sort(list)` on the array or list as usual.

If instead we choose to use `Comparator`, we'll need to declare a second `Comparator` class, and then implement that:

```java
static class Person{
    int height, weight;
    public Person(int h, int w){
        height = h; weight = w;
    }
}
static class Comp implements Comparator<Person>{
    public int compare(Person a, Person b){
        return Integer.compare(a.height, b.height);
    }
}
```

When using `Comparator`, the syntax for using the built-in sorting function requires a second argument: `Arrays.sort(arr, new Comp())`, or `Collections.sort(list, new Comp())`.

If we instead wanted to sort in descending order, this is also very simple. Instead of the comparing function returning `Integer.compare(x, y)` of the arguments, it should instead return `-Integer.compare(x, y)`.

### Python

There are 3 main ways to create a custom comparator in python

#### 1) Operator Overloading

<!-- Tested -->
```py
import random
class Foo:
	def __init__(self, _Bar): self.Bar = _Bar
	def __str__(self): return "Foo({})".format(self.Bar)
	def __lt__(self, o): # lt means less than
		return self.Bar < o.Bar

a = []
for i in range(8):
	a.append(Foo(random.randint(1, 10)))
print(*a)
print(*sorted(a))
```

Output:

```
Foo(0) Foo(1) Foo(2) Foo(1) Foo(9) Foo(5) Foo(5) Foo(8)
Foo(0) Foo(1) Foo(1) Foo(2) Foo(5) Foo(5) Foo(8) Foo(9)
```

#### 2) Remapping Key

 - This method maps an object to another comparable datatype with which to be sorted. In this case, `Foo` is sorted by the sum of its members `x` and `y`.


<!-- Tested -->
```py
import random
class Foo:
	def __init__(self, _Bar, _Baz): self.Bar,self.Baz = _Bar,_Baz
	def __str__(self): return "Foo({},{})".format(self.Bar, self.Baz)

a = []
for i in range(8):
	a.append(Foo(random.randint(1, 9)*10, random.randint(1, 9)))
print(*a)

print(*sorted(a, key=lambda foo: foo.Bar+foo.Baz))
def key(foo):
	return foo.Bar + foo.Baz
print(*sorted(a, key=key))
```

Output:

```
Foo(10,2) Foo(30,2) Foo(60,6) Foo(90,7) Foo(80,7) Foo(80,9) Foo(60,9) Foo(90,8)
Foo(10,2) Foo(30,2) Foo(60,6) Foo(60,9) Foo(80,7) Foo(80,9) Foo(90,7) Foo(90,8)
Foo(10,2) Foo(30,2) Foo(60,6) Foo(60,9) Foo(80,7) Foo(80,9) Foo(90,7) Foo(90,8)
```

#### 3) Function / Lambda

 - This method defines how to compare two elements represented by an integer
   - Positive: First term is greater than the second term
   - Zero: First term and second term are equal
   - Negative: First term is less than the second term

Note how the comparator must be converted to a `key`.

<!-- Tested -->

```py
import random
from functools import cmp_to_key
class Foo:
	def __init__(self, _Bar): self.Bar = _Bar
	def __str__(self): return "Foo({})".format(self.Bar)

a = []
for i in range(8):
	a.append(Foo(random.randint(0, 9)))
print(*a)

print(*sorted(a, key=cmp_to_key(lambda foo1, foo2: foo1.Bar - foo2.Bar)))
def cmp(foo1, foo2):
	return foo1.Bar - foo2.Bar
print(*sorted(a, key=cmp_to_key(cmp)))
```

Output:

```
Foo(0) Foo(1) Foo(2) Foo(1) Foo(9) Foo(5) Foo(5) Foo(8)
Foo(0) Foo(1) Foo(1) Foo(2) Foo(5) Foo(5) Foo(8) Foo(9)
Foo(0) Foo(1) Foo(1) Foo(2) Foo(5) Foo(5) Foo(8) Foo(9)
```


## Sorting by Multiple Criteria

Now, suppose we wanted to sort a list of `Person`s in ascending order, primarily by height and secondarily by weight. We can do this quite similarly to how we handled sorting by one criterion earlier. What the comparator function needs to do is to compare the weights if the heights are equal, and otherwise compare heights, as that's the primary sorting criterion.

### C++


```cpp
bool cmp(Person a, Person b) {
    if(a.height == b.height) {
        return a.weight < b.weight;
    }
    return a.height < b.height; 
}

int main() {
    sort(arr, arr+N, cmp); // sorts the array in ascending order by height and then weight if the heights are equal
}
```

Sorting with an arbitrary number of criteria is done similarly.

### Java

```java
static class Person implements Comparable<Person>{
    int height, weight;
    public Person(int h, int w){
        height = h; weight = w;
    }
    public int compareTo(Person p){
        if(height == p.height){
            return Integer.compare(weight, p.weight);
        } else {
            return Integer.compare(height, p.height);
        }
    }
}
```

Sorting with an arbitrary number of criteria is done similarly.

An alternative way of representing custom objects is with arrays. Instead of using a custom object to store data about each person, we can simply use `int[]`, where each `int` array is of size 2, and stores pairs of {height, weight}, probably in the form of a list like `ArrayList<int[]>`. Since arrays aren't objects in the usual sense, we need to use `Comparator`. Example for sorting by the same two criteria as above:

```java
static class Comp implements Comparator<int[]>{
    public int compare(int[] a, int[] b){
        if(a[0] == b[0]){
            return Integer.compare(a[1], b[1]);
        } else {
            return Integer.compare(a[0], b[0]);
        }
    }
}
```

I don't recommend using arrays to represent objects mostly because it's confusing, but it's worth noting that some competitors do this.

### Python

Operator Overloading can be used

<!-- Tested -->
```py
import random
class Foo:
	def __init__(self, _Bar, _Baz): self.Bar,self.Baz = _Bar,_Baz
	def __str__(self): return "Foo({},{})".format(self.Bar, self.Baz)
	def __lt__(self, o): # sort by increasing Bar, breaking ties by decreasing Baz
		if self.Bar != o.Bar: return self.Bar < o.Bar
		if self.Baz != o.Baz: return self.Baz > o.Baz
		return False

a = []
for i in range(8):
	a.append(Foo(random.randint(1, 9), random.randint(1, 9)))
print(*a)
print(*sorted(a))
```

Output:

```
Foo(1,2) Foo(3,2) Foo(6,6) Foo(9,7) Foo(8,7) Foo(8,9) Foo(6,9) Foo(9,8)
Foo(1,2) Foo(3,2) Foo(6,9) Foo(6,6) Foo(8,9) Foo(8,7) Foo(9,8) Foo(9,7)
```

A custom comparator works as well
 - Lambdas aren't shown here because they are typically used as one-liners

```py
import random
from functools import cmp_to_key

class Foo:
	def __init__(self, _Bar, _Baz): self.Bar,self.Baz = _Bar,_Baz
	def __str__(self): return "Foo({},{})".format(self.Bar, self.Baz)

a = []
for i in range(8):
	a.append(Foo(random.randint(1, 9), random.randint(1, 9)))
print(*a)

def cmp(foo1, foo2): # Increasing Bar, breaking ties with decreasing Baz
	if foo1.Bar != foo2.Bar: return -1 if foo1.Bar < foo2.Bar else 1
	if foo1.Baz != foo2.Baz: return -1 if foo1.Baz > foo2.Baz else 1
	return 0
print(*sorted(a, key=cmp_to_key(cmp)))

# Python automatically sorts tuples in increasing order with priority to the leftmost element
# You can sort objects by its mapping to a tuple of its elements
# The following sorts Foo by increasing Bar values, breaking ties with increasing Baz value
print(*sorted(a, key=lambda foo: (foo.Bar, foo.Baz)))
```
Output:
```
Foo(1,2) Foo(3,2) Foo(6,6) Foo(9,7) Foo(8,7) Foo(8,9) Foo(6,9) Foo(9,8)
Foo(1,2) Foo(3,2) Foo(6,9) Foo(6,6) Foo(8,9) Foo(8,7) Foo(9,8) Foo(9,7)
Foo(1,2) Foo(3,2) Foo(6,6) Foo(6,9) Foo(8,7) Foo(8,9) Foo(9,7) Foo(9,8)
```

## Problems

 - [Lifeguards](http://usaco.org/index.php?page=viewproblem2&cpid=786)
 - [Rental Service](http://usaco.org/index.php?page=viewproblem2&cpid=787)
 - [Mountains](http://usaco.org/index.php?page=viewproblem2&cpid=896)
 - [Mooyo Mooyo](http://www.usaco.org/index.php?page=viewproblem2&cpid=860)
   - Not a sorting problem, but you can use sorting to simulate gravity nicely.
     - Write a custom comparator (read below) which puts zeroes at the front and use `stable_sort` to keep the relative order of other elements the same.
 - [Meetings](http://www.usaco.org/index.php?page=viewproblem2&cpid=967)
   - hard!