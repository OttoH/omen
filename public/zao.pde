/* @pjs preload="data/z3_s.jpg, data/z2_s.jpg"; */



PImage a, b;

boolean onetime = true;

int[] aPixels = new int[424*600];
int[] bPixels = new int[424*600];

int direction = 1,
    flag = 1,
    change = 0;



float signal;



void setup() 

{

  size(424, 600);

  stroke(255);

  a = loadImage("data/z3_s.jpg");

  for(int i=0; i<width*height; i++) {

    aPixels[i] = a.pixels[i];

  }

  b = loadImage("data/z2_s.jpg");
  for(int i=0; i<width*height; i++) {

    bPixels[i] = b.pixels[i];

  }

  frameRate(30);

}



void draw() 

{

  if (signal > height-1 || signal < 0) { 

    direction = direction * -1; 
    change ++;

    if (change == 2) {
      flag ++;
      flag = flag % 2;

      change = 0;
    }
    
  }


/*
  if(mousePressed) {

    signal = abs(mouseY%height);

  } else {

    signal += (1.2*direction);  

  }
*/

signal += (1.2*direction);
  
//println(signal);
  
  /*
  if(keyPressed) {

    loadPixels();

    for (int i=0; i<width*height; i++) { 

      pixels[i] = aPixels[i];  

    }

    updatePixels();

    line(0, signal, width, signal);

  } else {
  */
    loadPixels();

    for (int i=0; i<width*height; i++) { 

      if (flag == 1) {
        if (i >= width*int(signal)) {
          pixels[i] = aPixels[int((width*int(signal))+(i%width))];
        
        } else {
          pixels[i] = aPixels[i];

        }

      } else {
        if (i >= width*int(signal)) {
          pixels[i] = bPixels[int((width*int(signal))+(i%width))];
        
        } else {
          pixels[i] = bPixels[i];

        }

      }

    }

    updatePixels();

    //line(0, signal, width, signal);
/*
  }
*/
  

}