
public class main {
    //Elijah's Function
    public static void elijah(int n){
        for(int i = 0; i < n; ++i){
            System.out.println(":D");
        }
    }
    
    public static  char convertToAscii (int a){
        char ascii = (char)a;
        return ascii;
    }
    
    //Christian Laviolette
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        alecsFunction();
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
  
  private static void alecsFunction() {
        System.out.println("This is for lab 3 in CS 41600 \n:)");
    }


    static void davidsFunction() {
        int rand_x,rand_y;
        Random rand = new Random(); 
        rand x = rand.nextInt(rand_x);
        rand y = rand.nextInt(rand_y);

        System.out.println("Your lucky number is: " + (x + y));
    }
    
}