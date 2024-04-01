class Entry{
    int n , lvl;
    public Entry(int n,int lvl){
        this.n = n;
        this.lvl = lvl;
    }
}

class Main{
    public static void Main(String[] args){
        Queue<Entry> q = new LinkedList<>();
        Entry e = new Entry(10,0);
        q.add(e);

        while(!q.isEmpty()){
            Entry fEntry = q.remove();
            if(fEntry.n == 1){
                System.out.println(fEntry,lvl);
                break;
                
            }
            if(fEntry.n%2 == 0){
                Entry child = new Entry(fEntry.n/2,fEntry.lvl+1);
                q.add(child);
            }
            if(fEntry.n%3 == 0){
                Entry child = new Entry(fEntry.n/3,fEntry.lvl+1);
                q.add(child);
            }
            Entry child = new Entry(fEntry.n - 1,fEntry.lvl+1);
            q.add(child);
        }
    }
}