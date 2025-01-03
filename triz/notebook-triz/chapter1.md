### 创新算法

#### 第一阶段 选择问题

1. **确定答案的最终目标**

   * 技术目标是什么（物体必须改变的特征是什么）？
   * 在解决问题的过程中，明显不能改变的特征是什么？
   * 答案的经济目标是什么（如果问题解决了，能减少哪方面成本）？
   * 大概可以接受的成本是什么？
   * 必须改善的主要技术或经济特征是什么？

2. **尝试“变通方法”：假设这个问题从根本上不能解决，那么解决哪些一般性问题可以达到最终结果？**

3. **初始问题或变通问题，哪一个解决起来更有意义？**

   * 将初始问题与给定行业内的一个趋势（一个进展方向）相比；
   * 将初始问题与领先行业的一个趋势（一个进展方向）相比；
   * 将变通问题与给定行业内一个趋势（一个进展方向）相比；
   * 将变通问题与行业内的一个领先趋势（一个进展方向）相比；
   * 将初始问题和变通问题进行对比，选择其中珍上进行研究。

4. **确定量化特征**

5. **对这个量化特征引入时间校正**

6. **定义让发明起作用的特殊条件要求**

   * 考虑制造这个产品的特殊要求：特别是复杂度的可接受程度；
   * 考虑将来应用的规模

#### 第二阶段 精确地定义问题

1. **用专利信息更精确地定义问题**

   * 在其他专利中解决的问题，与给定的问题有多接近?
   * 在领先行业中已经解决的问题，与给定的问题有多相似？
   * 相反的问题是怎么解决的？

2. **使用STC算子（S--尺寸，T--时间，C--成本）**

   * 假定改变物体的尺寸，从定值到零（S--0）,这个问题能解决吗？如果可以，怎么解决？
   * 假定改变物体的尺寸，从给定值到无穷大（S--∞），这个问题能解决吗？如果可以，怎么解决？
   * 假定改变过程的时间（或物体的速度），从给定值到零（T--0），这个问题能解决吗？如果可以，怎么解决？
   * 假定改变过程的时间（或物体的速度），从给定值到无穷大（T--∞），这个问题能解决吗？如果可以，怎么解决？
   * 假定改变物体或过程的成本————可接受的成本，从给定值到零（C--0），这个问题能解决吗？如果可以，怎么解决？
   * 假定改变物体或过程的成本————可接受的成本，从给定值到无穷大（C--∞），这个问题可以解决吗？如果可以，怎么解决？

3. **按照下述格式，用两句话来描述问题的条件（不要使用专用术语，也不要准确表述想要开发的是什么）。**

   * “给定一个系统，由什么部件（描述部件）组成。”

     例如：“一个管道，有一个阀门。”

   * “部件（陈述部件）在什么条件（陈述条件）下，产生不希望的结果（陈述影响）。”

     例如：“带铁矿颗粒的水通过管道运输，铁矿颗粒会磨损阀门。”

4. **把上一步骤中的部件列入下表。**

   | 部件类型 | 部件 |
   | --- | --- |
   | 1. （在本问题的条件下）能够改变、重新设计或者重新调整的部件 | 比如：管道，阀门 |
   | 2. （在本问题的条件下）很难改变的部件 | 比如：水，铁矿颗粒 |

5. **从上一步骤中选择最容易的部件，改变、重新设计或调整。**

   * 如果上一步中所有部件改变的难易程度一样，那么从一个不动件开始（通常不动件比较容易改变）；
   * 如果上一步中的一个部件，与不良效果联系在一起，最后才考虑这个部件；
   * 如果这个系统只有很难改变的部件，那么从外部环境中选择一个部件；

#### 第三阶段 分析阶段

1. **用下述格式归纳IFR（最终理想解）：**

   * 从上阶段最后一步中选择一个部件；
   * 陈述它的活动；
   * 陈述它如何完成这个活动（回答这个问题时使用：“由它自己”）；
   * 陈述它何时完成这个活动；
   * 陈述在什么条件（限制、要求等）下，它完成这个活动。
   
     例如：管道……改变它的截面积……它自己……在控制流量的时候……不要磨损管道。

2. **画两张图：在IFR之前的“初始图”和达到IFR后的“理想图”**

   没有特殊要求，只要能反映“初始状态”和“理想状态”的本质即可。而且“理想图”必须反映出IFR中书面表达的内容。

   上阶段中陈述的所有部件必须出现在图中。如果选择了外部环境中的部件，那么外部环境一定要显示在“理想图”中。

3. **在“理想图”中，找到本阶段第1步中的部件，把那些在规定条件下不能实施规定功能的部分，重点标出来**

   例如：我们的问题中，管道的内表面就是这样的部件。

4. **为什么这个部件（它自己）不能完成规定的活动？**

   - 从物体重点标记地方我们期望得到什么？
   
      例如:为了改变流量，管道的内表面一定要能自己改变横截面。
   
   - 什么妨碍它自己完成这个活动？
   
      例如：它不能动，因此它不能把自己从管壁中分离出来。
   
   - 在上述问题之间有什么冲突？
   
      例如:它必须是不动的（作为刚性管道的一个部件），又必须是可动的（作为控制器的部件，要能缩能放）。
      
1. **在什么条件下，这个部件能够完成规定的活动（这个部件应该有什么参数？）**

   这时不需要考虑能否实现，只要指出这个特征即可，不要关心它如何实现。
   
   例如：在管子的内表面上出现一层物质，使其内表面离管轴更近。在需要的时候这个附加层消失，内表面就远离管轴。
   
1. **为了让这个部件（管子的内表面）得到上一步描述的特征，需要做什么？**

   - 在图上，在物体的标记区用箭头画出所需施加的外力，以实现需要的特征；
   - 怎样产生这些外力？（不要考虑会和条件产生矛盾的方法）；
      
      例如：水（冰）中的矿物质会形成颗粒依附在管道的内表面上，管道里没有别的物质，这决定了我们的选择。
      
1. **归纳一个能够实现的概念，如果有几个概念，用数字为它们命名，最可能实现的排在前面。**

   例如：用非磁性材料设计管道，在电磁场的作用下，颗粒状的矿物质在管道的内表面上可以“长”出来。
   
1. **画出原理图，实现概念。**

   - 新设备中工作部件的“聚集”（复合部件）状态是什么？
   - 在一个循环内，设备如何变化？
   - 多次循环后，设备如何变化？

#### 第四阶段 概念的初步分析

1. **在应用新概念的时候，什么变好了，什么恶化了，记录得到了什么，什么变得更复杂或者更昂贵了？**

1. **改变提出的设备或者方法，能否防止其恶化？用图表示这个设备或者方法。**

1. **现在改变了的设备什么恶化了（更复杂，更昂贵）？**

1. **比较得失。**

   - 哪一个更大？

   - 为什么？

1. **如果现在甚至未来得大于失，那么跳到第六阶段。如果失大于得，返回第三阶段，重新分析。如果在第二次分析中没有产生新的结果，返回第二阶段第4步，检查表格。选择其他部件，重新分析。如果没有得到满意的答案，进入下一阶段。**
      
#### 第五阶段 实施阶段

1. **从矛盾矩阵的列中，选择一定要改善的特征。**

1. 

   - 使用已知的手段（不考虑其他方面损失），来改善这个特征
   - 如果采用了已知手段，什么特征变得不可接受了？
   
1. **从矛盾矩阵的行中，选择与上一步中相应的那个特征。**

1. **在矩阵中，找到用来消除技术矛盾的原理**

1. **如何使用这些原理**

   如果问题现在解决了，那么回到第四阶段，然后跳到第六阶段。如果问题没有解决，实施下面的步骤。
   
1. **尝试应用物理现象和效应。**

1. **尝试改变活动的时刻或持续时间。**

   - 能否“延长”活动的时间来消除矛盾？
   - 能否“缩短”活动的时间来消除矛盾？
   - 能否在物体开始操作之前，提供一个活动来消除矛盾？
   - 能否在物体开始操作之后，提供一个活动来消除矛盾？
   - 如果过程是连续的，能否把它转变成周期性的？
   - 如果过程是周期性的，能否把它转变成连续的？

1. **在自然界里，类似的问题是如何解决的？**

   - 自然界的非生命体如何解决这个问题？
   - 古代的动植物如何解决这个问题？
   - 现代的有机物如何解决这个问题？
   - 在考虑特定的新技术和材料时，必须做哪些修正？

1. **尝试改变那些与我们研究的物体协同工作的物体。**

   - 我们的系统属于哪个超系统？
   - 如果我们改变超系统，这个问题如何解决？
   
   如果问题仍然没有解决，回到第一阶段第3步。如果解决了，返回第四阶段，评估已经找到的想法，然后继续第六阶段。
   
#### 第六阶段 综合阶段

1. **确定如何改变我们修改的系统所属的超系统。**

2. **探索如何用不同的方式应用已修改的系统。**

3. **应用新发现的技术想法（或者与之相反的想法），来解决其他技术问题。**



