
public class main {

    public static void main(String[] args) {

    }

    public static char convertToAscii(int a) {
        char ascii = (char) a;
        return ascii;
    }

    // Christian Laviolette
    public static void christian(String[] args) {
        System.out.println("Hello, World!");

        alecsFunction();
        int luckyNumber = davidsFunction();

    }

    public static int add(int x, int y) {
        return x + y;
    }

    private static void alecsFunction() {
        System.out.println("This is for lab 3 in CS 41600");
    }

    static void davidsFunction() {
        int rand_x, rand_y;
        Random rand = new Random();
        rand x = rand.nextInt(rand_x);
        rand y = rand.nextInt(rand_y);

        System.out.println("Your lucky number is: " + (x + y));
    }

}
