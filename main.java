
public class main {


    
    public static  char convertToAscii (int a){
    char ascii = (char)a;
    return ascii;
    }
    
    //Christian Laviolette
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int luckyNumber = davidsFunction();
        System.out.println(isEven(4));
    }

    //Nick Lachcik
    public static boolean isEven(int n){
        return n%2==0;
    }

    public static int add(int x, int y) {
        return x+y;
    }


    static void davidsFunction() {
        int rand_x,rand_y;
        Random rand = new Random(); 
        rand x = rand.nextInt(rand_x);
        rand y = rand.nextInt(rand_y);

        System.out.println("Your lucky number is: " + (x + y));
    }
    
}