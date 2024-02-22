

public class main {

    public static void main(String[] args){
        
    }
    
    public static  char convertToAscii (int a){
    char ascii = (char)a;
    return ascii;
    }
    
    //Christian Laviolette
    public static void christian(String[] args) {
        System.out.println("Hello, World!");

        int luckyNumber = davidsFunction();
    }

    public static int add(int x, int y) {
        return x+y;
    }


    static void davidsFunction() {
        Random rand = new Random(); 

        int rand_x = rand.nextInt(1000);
        int rand_y = rand.nextInt(1000);
        int rand_z = rand.nextInt(1000);

        System.out.println("Your lucky number is: " + (x + y + z));
    }
    
}
